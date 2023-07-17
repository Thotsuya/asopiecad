<?php

namespace App\Jobs;

use App\Exports\ProjectExport;
use App\Models\ExcelReports;
use App\Models\Project;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\SimpleExcel\SimpleExcelWriter;
use App\Traits\DynamicComparisons;
use App\Traits\ReportResults;

class ExportBenefitiariesReportToExcel implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, DynamicComparisons, ReportResults;

    public $project;
    public $request;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($project, $request)
    {
        $this->request = $request;
        $this->project = $project;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //Generate Excel Report and save it to storage

        $goals = $this->project->goals()
            ->with([
                'program' => [
                    'forms',
                    'beneficiaries' => function ($query) {
                        $query->with([
                            'answers.pivot.field',
                            'appointments'
                        ])->when(
                            $this->request['start_date'] && $this->request['end_date'],
                            function ($query) {
                                $query->whereBetween(
                                    'benefitiary_program.created_at',
                                    [$this->request['start_date'], $this->request['end_date']]
                                );
                            }
                        );
                    },
                    'project'
                ]
            ])
            ->orderBy(function ($query) {
                $query->select('order')
                    ->from('programs')
                    ->whereColumn('programs.id', 'goals.program_id')
                    ->orderBy('order', 'desc')
                    ->limit(1);
            })
            ->get();

        $meetings = $this->project->meetings()->orderBy('order', 'asc')->get();

        if($this->request['start_date'] && $this->request['end_date']) {
            $fileName = Str::limit($this->project->project_name,40) . '-' . $this->request['start_date'] . '-' . $this->request['end_date'];
        } else {
            $fileName = Str::limit($this->project->project_name,40);
        }

        $fileName = $fileName.time().'.xlsx';


        $results = $this->getProjectResults($goals,$meetings);
        $global = $this->getGlobalResults($this->project, $results);
        $headers = $this->getHeaders($results);


        $writer = SimpleExcelWriter::create(Storage::path('public/reports/' . $fileName));
        $writer->addHeader([
            'Descripcion de los Indicadores',
            'Meta',
            'Progreso',
            'Porcentaje completado',
            'Meta anual',
            ...$headers,
            'Visitas realizadas a los
            beneficiarios en este
            indicador',
            'Numero total de participantes',
            'Pendientes'
        ]);

        foreach ($results as $result){

            match ($result['type']){
                'goal' => $writer->addRow([
                    $result['goal_description'],
                    $result['goal_target'],
                    $result['program']['beneficiaries_count'],
                    $result['program']['completed_percentage'],
                    $result['goal_target'] / $this->project->project_duration,
                    ...Arr::flatten(collect($headers)->map(function ($header) use ($result) {
                        return Arr::get(collect($result['conditions'])->where('label', $header)->first(),'value','N/A');
                    })->toArray()),
                    $result['program']['visits'],
                    $result['program']['beneficiaries_count'],
                    $result['program']['pending'],
                ]),
                'meeting' => $writer->addRow([
                    $result['goal_description'],
                    $result['goal_target'],
                    $result['current_progress'],
                    $result['completed_percentage'],
                    'N/A',
                    ...Arr::flatten(collect($headers)->map(function ($header) use ($result) {
                        return 'N/A';
                    })->toArray()),
                    'N/A',
                    'N/A',
                    $result['pending'],
                ]),
            };
        }

        $this->project->excelReports()->create([
            'file_name' => $fileName,
            'file_path' => 'public/reports/' . $fileName,
            'generated_at' => now(),
        ]);
    }
}

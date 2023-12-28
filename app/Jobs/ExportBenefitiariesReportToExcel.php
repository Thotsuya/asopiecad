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
use OpenSpout\Common\Entity\Style\Color;
use OpenSpout\Common\Entity\Style\CellAlignment;
use OpenSpout\Common\Entity\Style\Style;
use OpenSpout\Common\Entity\Style\Border;
use OpenSpout\Common\Entity\Style\BorderPart;
use OpenSpout\Writer\XLSX\Options;

class ExportBenefitiariesReportToExcel implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, DynamicComparisons, ReportResults;

    public $project;
    public $request;
    public $filename;
    public $reportResult;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($project, $request)
    {
        $this->request = $request;
        $this->project = $project;

        if($this->request['start_date'] && $this->request['end_date']) {
            $this->filename = Str::limit($this->project->project_name,40) . '-' . $this->request['start_date'] . '-' . $this->request['end_date'];
        } else {
            $this->filename = Str::limit($this->project->project_name,40).'-'.now()->format('Y-m-d');
        }

        $this->filename = $this->filename.time().'.xlsx';

        //Generate the report
        $this->reportResult = $this->project->excelReports()->create([
            'file_name' => $this->filename,
            'file_path' => 'reports/' . $this->filename
        ]);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //Generate Excel Report and save it to storage



        // The ones marked as not visible will be shown first, sort the list so that they are at the top
        $results = collect($this->project->report->fields)
                            ->unique('goal_description')
                            ->sortBy('visible')
                            ->values();

        $global = $this->project->report->global_fields;
        $headers = $this->getHeaders(collect($results));
        $screenings = $this->getScreeningsReport($this->project['id'] === 2 ? 'P-4353': 'P-4211');


        $writer = SimpleExcelWriter::create(
            file: Storage::disk('public')->path('reports/' . $this->filename),
            configureWriter: function ($writer) {
                $options = $writer->getOptions();
                $options->DEFAULT_COLUMN_WIDTH=30; // set default width
                $options->DEFAULT_ROW_HEIGHT=80; // set default height
                // set columns 1, 3 and 8 to width 40
                $options->setColumnWidth(50, 1);
            }
        );

        $style = (new Style())
            ->setFontSize(12)
            ->setFontName('Verdana')
            ->setShouldWrapText();

        $headerStyle = (new Style())
            ->setFontSize(12)
            ->setFontName('Verdana')
            ->setFontColor(Color::WHITE)
            ->setBackgroundColor('3F51B5')
            ->setShouldWrapText();


        $writer->setHeaderStyle($headerStyle);

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



        $i = 0;

        foreach ($results as $result){

            if($i == 2 && $this->project->id == 1){
                $writer->addRow($screenings, $style);
            }

            if($i == 8 && $this->project->id == 2){
                $writer->addRow($screenings, $style);
            }

            match ($result['type']){
                'goal' => $writer->addRow([
                    $result['goal_description'],
                    $result['goal_target'],
                    $result['goal_total'],
                    $result['program']['completed_percentage'],
                    $result['goal_target'] / $this->project->project_duration,
                    ...Arr::flatten(collect($headers)->map(function ($header) use ($result) {
                        return Arr::get(collect($result['conditions'])->where('label', $header)->first(),'value','N/A');
                    })->toArray()),
                    $result['program']['visits'],
                    $result['goal_total'],
                    $result['program']['pending'],
                ], $style),
                'meeting', 'inventory' => $writer->addRow([
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
                ], $style),
            };

            $i++;

            //For each 1k rows, flush the writer
            if($i % 1000 == 0) {
                flush();
            }

        }

        $writer->close();

        $this->reportResult->update([
            'generated_at' => now()
        ]);

    }
}

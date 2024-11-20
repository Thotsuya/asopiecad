<?php

namespace App\Jobs;

use App\Models\Benefitiary;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\LazyCollection;
use Illuminate\Support\Str;
use Spatie\SimpleExcel\SimpleExcelWriter;
use OpenSpout\Common\Entity\Style\Color;
use OpenSpout\Common\Entity\Style\CellAlignment;
use OpenSpout\Common\Entity\Style\Style;
use OpenSpout\Common\Entity\Style\Border;
use OpenSpout\Common\Entity\Style\BorderPart;


class ExportBenefitiariesCompleteReportToExcel implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public Collection $beneficiaries;
    public $filename;
    public $reportResult;
    public $request;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($request)
    {
        $this->filename = 'Reporte de Participantes '.now()->format('Y-m-d').time().'.xlsx';
        $this->reportResult = User::first()->excelReports()->create([
            'file_name' => $this->filename,
            'file_path' => 'reports/' . $this->filename
        ]);
        $this->request = $request;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $request = new Request($this->request);
        $beneficiaries = Benefitiary::query()
            ->filter($request)
            ->withTrashed()
            ->viewableBy(User::find(1))
            ->withCount('projects')
            ->with(['answers.pivot.field', 'answers.pivot','projects'])
            ->latest('id')
            ->cursor()
            ->map(function ($beneficiary) {
                return [
                    'id'              => $beneficiary->id,
                    'uuid'            => $beneficiary->uuid,
                    'internal_status' => $beneficiary->internal_status,
                    'name'            => $beneficiary->name,
                    'projects'        => // return a string, with all the project names separated by comma
                        $beneficiary->projects->map(function ($project) {
                            return $project->project_name;
                        })->implode(', '),
                    'answers'         => $beneficiary->answers_data,
                ];
            });


        $headers = $beneficiaries->pluck('answers')->flatten(1)->pluck('field')->unique()->toArray();

        $writer = SimpleExcelWriter::create(Storage::disk('public')->path('reports/' . $this->filename));

        $style = (new Style())
            ->setFontSize(12)
            ->setFontName('Verdana');

        $headerStyle = (new Style())
            ->setFontSize(12)
            ->setFontName('Verdana')
            ->setFontColor(Color::WHITE)
            ->setBackgroundColor('3F51B5');


        $writer->setHeaderStyle($headerStyle);

        $writer->addHeader(['ID', 'UUID', 'Estado Interno', 'Nombre', 'Proyectos', ...$headers]);

        //Chunking the collection to avoid memory issues

        $beneficiaries->each(function ($beneficiary) use ($writer, $style,$headers) {

                $writer->addRow([
                    $beneficiary['id'],
                    $beneficiary['uuid'],
                    $beneficiary['internal_status'],
                    $beneficiary['name'],
                    $beneficiary['projects'],
                    ...Arr::flatten(collect($headers)->map(function ($header) use ($beneficiary) {
                        return Arr::get(collect($beneficiary['answers'])->where('field', $header)->first(), 'answer', null);
                    })->toArray()),
                ], $style);

            //Flush the writer to avoid memory issues
            flush();
        });

        $writer->close();


        $this->reportResult->update([
            'generated_at' => now(),
        ]);
    }

    private function getAnswerValue($answer)
    {
        if ($answer->pivot->field->type === 'select') {
            //  return $answer->pivot->field->options->where('value', json_decode($answer->pivot->value))->first()->name;
            return  Arr::get(collect($answer->pivot->field->options)->where('value', $answer->pivot->value)->first(), 'name', null);
        }

        if ($answer->pivot->field->type === 'select multiple') {
//            return $answer->pivot->field->options->whereIn('value', json_decode($answer->pivot->value))->pluck('name')->implode(', ');
            return collect($answer->pivot->field->options)->whereIn('value', json_decode($answer->pivot->value))->pluck(
                'name'
            )->implode(', ');
        }

        return Str::startsWith($answer->pivot->value, '["') && Str::endsWith($answer->pivot->value, '"]')
            ? json_decode($answer->pivot->value) : $answer->pivot->value;
    }

}

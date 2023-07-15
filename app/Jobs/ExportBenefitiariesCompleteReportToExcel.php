<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\SimpleExcel\SimpleExcelWriter;

class ExportBenefitiariesCompleteReportToExcel implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public Collection $beneficiaries;
    public array $headers;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Collection $beneficiaries)
    {
        $this->beneficiaries = $beneficiaries->map(function ($beneficiary) {
            return [
                'id'              => $beneficiary->id,
                'uuid'            => $beneficiary->uuid,
                'internal_status' => $beneficiary->internal_status,
                'name'            => $beneficiary->name,
                'projects'        => // return a string, with all the project names separated by comma
                    $beneficiary->projects->map(function ($project) {
                        return $project->project_name;
                    })->implode(', '),
                'answers'         => $beneficiary->answers->map(function ($answer) {
                    return [
                        'field'  => $answer->pivot->field->name,
                        'answer' => $this->getAnswerValue($answer),
                    ];
                })->values()->toArray(),
            ];
        });

        $this->headers = $this->beneficiaries->pluck('answers')->flatten(1)->pluck('field')->unique()->toArray();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //
        $fileName = 'Reporte de Participantes '.time().'.xlsx';

        $writer = SimpleExcelWriter::create(Storage::path('public/reports/' . $fileName));

        info(json_encode(['ID', 'UUID', 'Estado Interno', 'Nombre', 'Proyectos', ...$this->headers]));
        $writer->addHeader(['ID', 'UUID', 'Estado Interno', 'Nombre', 'Proyectos', ...$this->headers]);

        //Chunking the collection to avoid memory issues

        $this->beneficiaries->chunk(1000)->each(function ($chunk) use ($writer) {

            $chunk->each(function ($beneficiary) use ($writer) {
                $writer->addRow([
                    $beneficiary['id'],
                    $beneficiary['uuid'],
                    $beneficiary['internal_status'],
                    $beneficiary['name'],
                    $beneficiary['projects'],
                    ...Arr::flatten(collect($this->headers)->map(function ($header) use ($beneficiary) {
                        return Arr::get(collect($beneficiary['answers'])->where('field', $header)->first(), 'answer', null);
                    })->toArray()),
                ]);
            });

            //Flush the writer to avoid memory issues
            flush();
        });

        $writer->close();

        User::first()->excelReports()->create([
            'file_name' => $fileName,
            'file_path' => 'public/reports/' . $fileName,
            'generated_at' => now()
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

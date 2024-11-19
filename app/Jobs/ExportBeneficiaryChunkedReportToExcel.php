<?php

namespace App\Jobs;

use App\Models\Benefitiary;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Spatie\SimpleExcel\SimpleExcelWriter;

class ExportBeneficiaryChunkedReportToExcel implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $startId;
    protected $endId;
    protected $headers;
    protected $filename;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($startId, $endId, $headers, $filename)
    {
        $this->startId = $startId;
        $this->endId = $endId;
        $this->headers = $headers;
        $this->filename = $filename;
    }


    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $beneficiaries = Benefitiary::query()
            ->whereBetween('id', [$this->startId, $this->endId])
            ->withTrashed()
            ->withCount('projects')
            ->with(['answers.pivot.field', 'answers.pivot', 'projects'])
            ->get();

        $chunkFilename = 'chunk_' . $this->startId . '_' . $this->endId . '.xlsx';
        $writer = SimpleExcelWriter::create(Storage::disk('public')->path('reports/' . $chunkFilename));

        $writer->addHeader($this->headers);

        foreach ($beneficiaries as $beneficiary) {
            $row = [
                'id'              => $beneficiary->id,
                'uuid'            => $beneficiary->uuid,
                'internal_status' => $beneficiary->internal_status,
                'name'            => $beneficiary->name,
                'projects'        => $beneficiary->projects->pluck('project_name')->implode(', '),
                ...Arr::flatten(collect($this->headers)->map(function ($header) use ($beneficiary) {
                    return Arr::get(
                        collect($beneficiary->answers)->where('field', $header)->first(),
                        'answer',
                        null
                    );
                })->toArray()),
            ];

            $writer->addRow($row);
        }

        $writer->close();
    }
}

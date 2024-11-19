<?php

namespace App\Jobs;

use App\Models\Benefitiary;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DispatchExportBeneficiariesChunks implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $headers;
    protected $chunkSize;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($headers, $chunkSize = 5000)
    {
        $this->headers = $headers;
        $this->chunkSize = $chunkSize;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $maxId = Benefitiary::max('id');
        $minId = Benefitiary::min('id');

        for ($startId = $minId; $startId <= $maxId; $startId += $this->chunkSize) {
            $endId = $startId + $this->chunkSize - 1;

            $filename = 'Beneficiarios_'.now()->format('Y-m-d_H-i-s').'_'.$startId.'_'.$endId.'.xlsx';
            ExportBeneficiaryChunkedReportToExcel::dispatch($startId, $endId, $this->headers, $filename);
        }
    }
}

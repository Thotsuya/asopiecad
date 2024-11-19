<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Spatie\SimpleExcel\SimpleExcelReader;
use Spatie\SimpleExcel\SimpleExcelWriter;


class MergeChunksToExcel implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $finalFilename;

    public function __construct($finalFilename)
    {
        $this->finalFilename = $finalFilename;
    }

    public function handle()
    {
        $writer = SimpleExcelWriter::create(
            Storage::disk('public')->path('reports/' . $this->finalFilename)
        );

        $chunkFiles = Storage::disk('public')->files('reports/chunks/');

        foreach ($chunkFiles as $chunkFile) {
            SimpleExcelReader::create(Storage::disk('public')->path($chunkFile))
                ->getRows()
                ->each(function (array $row) use ($writer) {
                    $writer->addRow($row);
                });

                Storage::disk('public')->delete($chunkFile); // Clean up chunk file
        }

        $writer->close();
    }
}

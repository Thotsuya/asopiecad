<?php

namespace App\Jobs;

use App\Models\ExcelReports;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use OpenSpout\Common\Entity\Style\Color;
use OpenSpout\Common\Entity\Style\Style;
use Spatie\SimpleExcel\SimpleExcelWriter;

class ExportProjectMeetingsToExcel implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    public $filename;
    public $meeting;
    public $report;

    public function __construct($meeting)
    {
        $this->meeting = $meeting;
        $this->filename = $meeting->title.'-'.now()->format('Y-m-d').'.xlsx';
        $this->report = $meeting->excelReports()->create([
            'file_name' => $this->filename,
            'file_path' => 'public/reports/' . $this->filename
        ]);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $headers = $this->meeting->form->fields->pluck('name', 'id')->toArray();

        $writer = SimpleExcelWriter::create(
            file: Storage::path('public/reports/' . $this->filename),
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

        $writer->addHeader($headers);

        $this->meeting->participants->each(function ($participant) use ($writer, $style) {
            $writer->addRow(collect($participant->form_data)->values()->toArray(), $style);
        });

        $writer->close();

        $this->report->update([
            'generated_at' => now(),
        ]);

    }
}

<?php

namespace App\Jobs;

use App\Models\Screening;
use App\Models\User;
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
use App\Traits\ReportResults;

class ExportScreeningsToExcel implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, ReportResults;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    public string $type;
    public string $filename;
    public $reportResult;

    public function __construct($type)
    {
        $this->type = $type;
        $this->filename = 'Reporte de Tamizajes '.$type.' '.now()->format('Y-m-d').time().'.xlsx';
        $this->reportResult = User::first()->excelReports()->create([
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
        $screenings
            = Screening::query()
            ->filterByType($this->type)
            ->with('user')
            ->cursor();

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


        $headers = $this->getHeadersForScreenings($this->type);

        $writer->setHeaderStyle($headerStyle);

        $writer->addHeader(collect($headers)->keys()->toArray());

        $writer->addRows(
            $screenings->map(function ($screening) use ($headers) {
                //Return the values for each header
                return collect($headers)->map(function ($header) use ($screening) {
                    //If the header is an array, it means that it has subheaders
                    if(is_array($header)){

                        return collect($header)->reduce(function ($carry, $item) use ($screening) {
                            return $carry + $screening[$item];
                        }, 0);

                    }

                    if(is_array($screening[$header])){
                        return collect($screening[$header])->reduce(function ($carry, $item) {
                            return $carry . $item . ', ';
                        }, '');
                    }

                    return $screening[$header];


                })->toArray();
            })->toArray(),
            $style
        );

        $writer->close();

        $this->reportResult->update([
            'generated_at' => now(),
        ]);

    }
}

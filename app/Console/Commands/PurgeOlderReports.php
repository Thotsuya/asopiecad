<?php

namespace App\Console\Commands;

use App\Models\ExcelReports;
use Illuminate\Console\Command;

class PurgeOlderReports extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asopiecad:purge-older-reports';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Purge older reports from the project_reports table that are older that 7 days.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->comment('Purging older reports...');

        $reports = ExcelReports::where('generated_at', '<', now()->subDays(7))->get();

        $reports->each(function ($report) {
            $this->comment('Deleting Report ' . $report->file_name . '...');
            $report->delete();
        });

        $this->info('Purging older reports completed.');
    }
}

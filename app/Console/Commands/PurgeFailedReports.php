<?php

namespace App\Console\Commands;

use App\Models\ExcelReports;
use Illuminate\Console\Command;

class PurgeFailedReports extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asopiecad:purge-failed-reports';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Removes all failed reports from the database and the storage folder every 10 minutes';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Remove all failed reports from the database
        $this->info('Removing failed reports from the database...');

        ExcelReports::query()
            ->whereNull('generated_at')
            ->delete();

        $this->info('Done!');
        return Command::SUCCESS;
    }
}

<?php

namespace App\Console\Commands;

use App\Traits\DynamicComparisons;
use App\Traits\ReportResults;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class CalculateScreenings extends Command
{
    use DynamicComparisons, ReportResults;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asopiecad:calculate-screenings';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Calculating screenings...');
        Cache::remember('screenings-report-P-4353', 60 * 60 * 6, function () {
            return $this->getScreeningsReport('P-4353');
        });

        Cache::remember('screenings-report-P-4211', 60 * 60 * 6, function () {
            return $this->getScreeningsReport('P-4211');
        });

        $this->info('Screenings calculated successfully');
    }
}

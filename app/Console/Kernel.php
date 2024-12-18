<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Cache;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command(
            'asopiecad:update-project-reports-table'
        )
            ->everyTwoHours()
            ->withoutOverlapping()
            ->appendOutputTo(storage_path('logs/update-project-reports-table.log'));

        $schedule->command(
            'asopiecad:update-project-reports-grouped-results'
        )
            ->hourly()
            ->withoutOverlapping()
            ->appendOutputTo(storage_path('logs/update-project-reports-grouped-results.log'));

        // Max execution time 10 minutes
//        $schedule->command('queue:work --stop-when-empty --tries=3 --timeout=700')
//            ->everyMinute()
//            ->withoutOverlapping()
//            ->appendOutputTo(storage_path('logs/queue.log'));

        $schedule->command('asopiecad:purge-failed-reports')
            ->everySixHours()
            ->withoutOverlapping()
            ->appendOutputTo(storage_path('logs/purge.log'));

        $schedule->command('asopiecad:purge-older-reports')
            ->dailyAt('00:00')
            ->withoutOverlapping()
            ->appendOutputTo(storage_path('logs/purge.log'));

        $schedule->command('asopiecad:update-beneficiaries-report-table')
            ->everyFourHours()
            ->withoutOverlapping()
            ->appendOutputTo(storage_path('logs/update-beneficiaries-report-table.log'));

        $schedule->command('asopiecad:calculate-screenings')
            ->everyFourHours()
            ->withoutOverlapping()
            ->appendOutputTo(storage_path('logs/calculate-screenings.log'));
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}

<?php

namespace App\Console\Commands;

use App\Models\Benefitiary;
use Illuminate\Console\Command;

class PurgeBenefitiariesFromProjectBetweenDates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asopiecad:purge-beneficiaries-from-project-between-dates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Purge beneficiaries from project between dates';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $beneficiaries =
            Benefitiary::query()
               ->whereBetween('created_at',[now()->subDays(7),now()->subDays(5)])
                ->cursor()
                ->each(function (Benefitiary $beneficiary) {

                    //Remove Observers
                    $beneficiary->unsetEventDispatcher();

                    $beneficiary->answers()->detach();
                    $beneficiary->projects()->detach();

                    $beneficiary->forms()->detach();
                    $beneficiary->programs()->detach();
                    $beneficiary->appointments()->forceDelete();

                    $beneficiary->forceDelete();
                });

        $this->info('Purging beneficiaries...');
        $this->info('Done!');

        return 0;
    }
}

<?php

namespace App\Observers;

use App\Models\Benefitiary;
use App\Traits\ReportResults;

class BeneficiaryObserver
{

    use ReportResults;
    /**
     * Handle the Beneficiary "created" event.
     *
     * @param  \App\Models\Benefitiary  $beneficiary
     * @return void
     */
    public function created(Benefitiary $beneficiary)
    {

    }

    /**
     * Handle the Beneficiary "updated" event.
     *
     * @param  \App\Models\Benefitiary  $beneficiary
     * @return void
     */
    public function updated(Benefitiary $beneficiary)
    {
        //
    }

    /**
     * Handle the Beneficiary "deleted" event.
     *
     * @param  \App\Models\Benefitiary  $beneficiary
     * @return void
     */
    public function deleted(Benefitiary $beneficiary)
    {
        //
    }

    /**
     * Handle the Beneficiary "restored" event.
     *
     * @param  \App\Models\Benefitiary  $beneficiary
     * @return void
     */
    public function restored(Benefitiary $beneficiary)
    {
        //
    }

    /**
     * Handle the Beneficiary "force deleted" event.
     *
     * @param  \App\Models\Benefitiary  $beneficiary
     * @return void
     */
    public function forceDeleted(Benefitiary $beneficiary)
    {
        //
    }
}

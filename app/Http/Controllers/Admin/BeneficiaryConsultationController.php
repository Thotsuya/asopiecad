<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Benefitiary;
use Illuminate\Http\Request;

class BeneficiaryConsultationController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke(Benefitiary $beneficiary,Request $request)
    {
        $beneficiary->increment('consultations_count');
        $beneficiary->update([
            'last_consultation' => now()
        ]);
        return redirect()->back();
    }
}

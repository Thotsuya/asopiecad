<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AppointmentResource;
use App\Models\Benefitiary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BeneficiaryVisitsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function __invoke(Benefitiary $beneficiary)
    {
        $visits = $beneficiary
            ->appointments()
            ->with(['user', 'benefitiary'])
            ->latest('id')
            ->paginate(20)
            ->through(function ($appointment) {
                return AppointmentResource::make($appointment);
            })
            ->withQueryString();

        return Inertia::render('Beneficiares/BeneficiaryVisits', [
            'beneficiary' => $beneficiary,
            'visits'      => $visits,
        ]);
    }
}

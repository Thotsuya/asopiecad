<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BeneficiaryFormsResource;
use App\Http\Resources\BeneficiaryResource;
use App\Models\Benefitiary;
use App\Models\Program;
use Illuminate\Http\Request;

class ProgramFormController extends Controller
{
    public function create(Program $program,Request $request){
        $this->authorize('register-beneficiaries', $program->project);

        $forms = $program->forms()->with('tabs.fields')->get();
        $beneficiary = Benefitiary::with('answers')->findOrFail($request->beneficiary_id);

        return inertia('Beneficiares/Create', [
            'project'     => $program->project,
            'programs'    => [$program->id],
            'forms'       => BeneficiaryFormsResource::collection($forms),
            'is_new'      => false,
            'beneficiary' => BeneficiaryResource::make($beneficiary),
        ]);
    }

    public function remove(Program $program,Request $request){
        $this->authorize('register-beneficiaries', $program->project);

        $program->beneficiaries()->detach($request->beneficiary_id);

        return redirect()->route('projects.show', $program->project);

    }
}

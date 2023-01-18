<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BeneficiaryStoreRequest;
use App\Http\Resources\BeneficiaryFormsResource;
use App\Http\Resources\BeneficiaryResource;
use App\Models\Benefitiary;
use App\Models\Form;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class ProjectFormController extends Controller
{

    public function create(Request $request, Project $project)
    {


        $this->authorize('register-beneficiaries', $project);
        $this->validate($request, [
            'is_new_beneficiary' => ['required', Rule::in(['true', 'false'])],
            'beneficiary_name' => Rule::requiredIf(fn() => $request->input('is_new_beneficiary') === 'true'),
            'beneficiary_id' => [Rule::requiredIf(fn() => $request->input('is_new_beneficiary') === 'false')],
        ], [
            'beneficiary_name.required' => 'El nombre del nuevo beneficiario es requerido',
            'beneficiary_id.required' => 'Debe seleccionar un beneficiario existente o crear uno nuevo',
        ]);

        $forms = $project->forms()->get();

        return inertia('Beneficiares/Create', [
            'project' => $project,
            'forms' => BeneficiaryFormsResource::collection($forms),
            'is_new' => $request->is_new_beneficiary === 'true',
            'beneficiary' => $request->is_new_beneficiary === 'true' ? $request->beneficiary_name : BeneficiaryResource::make(Benefitiary::findOrFail($request->beneficiary_id)->load('forms')),
        ]);
    }

    public function store(BeneficiaryStoreRequest $request, Project $project)
    {
        $this->authorize('register-beneficiaries', $project);


        $beneficiary = Benefitiary::create([
            'name' => $request->validated()['name'],
            'internal_status' => auth()->user()->can('approve-beneficiaries',$project)
                ? Benefitiary::INTERNAL_STATUSES['approved']
                : Benefitiary::INTERNAL_STATUSES['pending'],
            'approved_at' => auth()->user()->can('approve-beneficiaries', $project)
                ? now()
                : null,
        ]);

        $forms = $project->forms()->get()->mapWithKeys(function(Form $form) use($request) {
            $fields = $form->getFormFields();

            return [$form->id => [
                'form_data' => json_encode(collect($request->validated())->only($fields)->toArray())
            ]];

        })->toArray();

        $project->beneficiaries()->attach($beneficiary->id);
        $beneficiary->forms()->attach($forms);

        return redirect()->route('projects.show', $project);
    }

    public function edit(Request $request, Project $project, Benefitiary $beneficiary)
    {
        $this->authorize('edit-beneficiaries', $project);

        $forms = $project->forms()->get();

        return inertia('Beneficiares/Edit', [
            'project' => $project,
            'forms' => BeneficiaryFormsResource::collection($forms),
            'beneficiary' => BeneficiaryResource::make($beneficiary->load('forms')),
        ]);
    }

    public function update(BeneficiaryStoreRequest $request, Project $project, Benefitiary $beneficiary)
    {
        $this->authorize('edit-beneficiaries', $project);

        $beneficiary->update([
            'name' => $request->validated()['name'],
        ]);

        $forms = $project->forms()->get()->mapWithKeys(function(Form $form) use($request) {
            $fields = $form->getFormFields();

            return [$form->id => [
                'form_data' => json_encode(collect($request->validated())->only($fields)->toArray())
            ]];

        })->toArray();

        $project->beneficiaries()->syncWithoutDetaching($beneficiary->id);
        $beneficiary->forms()->syncWithoutDetaching($forms);

        return redirect()->route('projects.show', $project);
    }

    public function destroy(Request $request, Project $project, Benefitiary $beneficiary)
    {

        $this->authorize('delete-beneficiaries', $project);

        $beneficiary->update([
            'internal_status' => Benefitiary::INTERNAL_STATUSES['deleted'],
            'deletion_reason' => $request->deletion_reason,
        ]);

        $beneficiary->delete();

        return redirect()->route('projects.show', $project);
    }
}

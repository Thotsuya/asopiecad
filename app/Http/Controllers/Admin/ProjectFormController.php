<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BeneficiaryStoreRequest;
use App\Http\Resources\BeneficiaryFormsResource;
use App\Models\Benefitiary;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class ProjectFormController extends Controller
{
    public function __construct()
    {
        $this->roles = Role::query()
            ->where('name', '!=', 'Super Admin')
            ->with('permissions')
            ->get();
    }

    public function create(Request $request, Project $project)
    {


        $this->authorize('register-beneficiaries', [$project, $this->roles]);
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
            'beneficiary' => $request->is_new_beneficiary === 'true' ? $request->beneficiary_name : Benefitiary::findOrFail($request->beneficiary_id),
        ]);
    }

    public function store(BeneficiaryStoreRequest $request, Project $project)
    {
        $this->authorize('register-beneficiaries', [$project, $this->roles]);

        $beneficiary = Benefitiary::create([
            'name' => $request->validated()['name'],
            'beneficiary_data' => $request->validated(),
            'internal_status' => auth()->user()->can('approve-beneficiaries', [$project, $this->roles])
                ? Benefitiary::INTERNAL_STATUSES['approved']
                : Benefitiary::INTERNAL_STATUSES['pending'],
            'approved_at' => auth()->user()->can('approve-beneficiaries', [$project, $this->roles])
                ? now()
                : null,
        ]);

        $project->beneficiaries()->attach($beneficiary->id);

        return redirect()->route('projects.show', $project);
    }

    public function edit(Request $request, Project $project, Benefitiary $beneficiary)
    {
        $this->authorize('edit-beneficiaries', [$project, $this->roles]);

        $forms = $project->forms()->get();

        return inertia('Beneficiares/Edit', [
            'project' => $project,
            'forms' => BeneficiaryFormsResource::collection($forms),
            'beneficiary' => $beneficiary,
        ]);
    }

    public function update(BeneficiaryStoreRequest $request, Project $project, Benefitiary $beneficiary)
    {
        $this->authorize('edit-beneficiaries', [$project, $this->roles]);

        $beneficiary->update([
            'name' => $request->validated()['name'],
            'beneficiary_data' => $request->validated(),
        ]);

        $project->beneficiaries()->syncWithoutDetaching($beneficiary->id);

        return redirect()->route('projects.show', $project);
    }

    public function destroy(Request $request, Project $project, Benefitiary $beneficiary)
    {

        $this->authorize('delete-beneficiaries', [$project, $this->roles]);

        $beneficiary->update([
            'internal_status' => Benefitiary::INTERNAL_STATUSES['deleted'],
            'deletion_reason' => $request->deletion_reason,
        ]);

        $beneficiary->delete();

        return redirect()->route('projects.show', $project);
    }
}

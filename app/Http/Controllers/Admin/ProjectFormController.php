<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BeneficiaryStoreRequest;
use App\Http\Resources\BeneficiaryFormsResource;
use App\Http\Resources\BeneficiaryResource;
use App\Models\Benefitiary;
use App\Models\Form;
use App\Models\Program;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProjectFormController extends Controller
{

    public function create(Request $request, Project $project)
    {
        $this->authorize('register-beneficiaries', $project);
        $this->validate($request, [
            'is_new_beneficiary' => ['required', Rule::in(['true', 'false'])],
            'beneficiary_name'   => Rule::requiredIf(fn() => $request->input('is_new_beneficiary') === 'true'),
            'beneficiary_id'     => [Rule::requiredIf(fn() => $request->input('is_new_beneficiary') === 'false')],
            'forms'              => ['required', 'array'],
        ], [
            'beneficiary_name.required' => 'El nombre del nuevo beneficiario es requerido',
            'beneficiary_id.required'   => 'Debe seleccionar un beneficiario existente o crear uno nuevo',
            'forms.required'            => 'Debe seleccionar al menos un formulario',
            'forms.array'               => 'Debe seleccionar al menos un formulario',
        ]);

        $programs = $project
            ->programs()
            ->with('forms')
            ->whereIn(
                'id',
                collect($request->input('forms'))
                    ->map(fn($form) => (int)$form)
                    ->toArray()
            )
            ->get();
        $forms = $programs->map(fn($program) => $program->forms->load('tabs.fields'))->flatten()->unique('id');


        return inertia('Beneficiares/Create', [
            'project'     => $project,
            'programs'    => $programs->pluck('id'),
            'forms'       => BeneficiaryFormsResource::collection($forms),
            'is_new'      => $request->is_new_beneficiary === 'true',
            'beneficiary' => $request->is_new_beneficiary === 'true' ? $request->beneficiary_name : BeneficiaryResource::make(
                Benefitiary::with('answers.pivot.field')->findOrFail($request->beneficiary_id)
            ),
        ]);
    }

    public function store(BeneficiaryStoreRequest $request, Project $project)
    {
        $this->authorize('register-beneficiaries', $project);

        \DB::transaction(function () use ($request, $project) {

            // Find in the request validated the first field whose key has the word cedula
            $cedula = collect($request->validated())->first(fn($value, $key) => str_contains($key, 'cedula'));

            $beneficiary = Benefitiary::create([
                'name'            => $request->validated()['name'],
                'document_id'     => $cedula,
                'internal_status' => auth()->user()->can('approve-beneficiaries', $project)
                    ? Benefitiary::INTERNAL_STATUSES['approved']
                    : Benefitiary::INTERNAL_STATUSES['pending'],
                'approved_at'     => auth()->user()->can('approve-beneficiaries', $project)
                    ? now()
                    : null,
                'created_by' => auth()->user()->id,
            ]);

            $programs = Program::find($request->validated()['programs']);

            $forms = $programs
                ->map(fn($program) => $program->forms->load('fields'))
                ->flatten()->unique('id');

            $forms->each(function (Form $form) use ($beneficiary, $request) {
                $fields = $form->fields->mapWithKeys(function ($field) use ($request) {
                    return [$field->id => [
                            'value' => is_array(
                                $request->validated()[$field->getFieldFormattedSlug()]
                            )
                                ? json_encode($request->validated()[$field->getFieldFormattedSlug()])
                                : $request->validated()[$field->getFieldFormattedSlug()]

                        ]
                    ];
                })->toArray();

                $beneficiary->answers()->attach($fields);
            });


            $beneficiary->programs()->attach($programs->pluck('id'));
            $beneficiary->forms()->attach($forms->pluck('id'));

            $beneficiary->projects()->attach($project->id);
        });

        return redirect()->route('projects.show', $project);
    }

    public function edit(Request $request, Project $project, Benefitiary $beneficiary)
    {
        $this->authorize('edit-beneficiaries', $project);

        $forms = $beneficiary->forms()->get();

        return inertia('Beneficiares/Edit', [
            'project'     => $project,
            'forms'       => BeneficiaryFormsResource::collection($forms->load('tabs.fields')),
            'programs'    => $beneficiary->programs()->get()->pluck('id'),
            'beneficiary' => BeneficiaryResource::make($beneficiary->load('forms','answers.pivot.field.tab')),
        ]);
    }

    public function update(BeneficiaryStoreRequest $request, Project $project, Benefitiary $beneficiary)
    {
        $this->authorize('edit-beneficiaries', $project);

        $cedula = collect($request->validated())->first(fn($value, $key) => str_contains($key, 'cedula'));

        $beneficiary->update([
            'name' => $request->validated()['name'],
            'document_id' => $cedula,
            'internal_status' => (auth()->user()->can('Aprobar Beneficiarios') && $request->validated()['approve']) ? Benefitiary::INTERNAL_STATUSES['approved'] : Benefitiary::INTERNAL_STATUSES['pending'],
            'approved_at'     => (auth()->user()->can('Aprobar Beneficiarios') && $request->validated()['approve']) ? now() : null,
            'created_by' => auth()->user()->id,
        ]);

        $programs = Program::find($request->validated()['programs']);

        $forms = $programs
            ->map(fn($program) => $program->forms->load('fields'))
            ->flatten()->unique('id');

        $forms->each(function (Form $form) use ($beneficiary, $request) {
            $fields = $form->fields->mapWithKeys(function ($field) use ($request) {
                return [$field->id => [
                        'value' => is_array(
                            $request->validated()[$field->getFieldFormattedSlug()]
                        )
                            ? json_encode($request->validated()[$field->getFieldFormattedSlug()])
                            : $request->validated()[$field->getFieldFormattedSlug()]

                    ]
                ];
            })->toArray();

            $beneficiary->answers()->syncWithoutDetaching($fields);
        });

        $beneficiary->programs()->syncWithoutDetaching($programs->pluck('id'));
        $project->beneficiaries()->syncWithoutDetaching($beneficiary->id);
        $beneficiary->forms()->syncWithoutDetaching($forms->pluck('id'));

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

    public function approve(Request $request, Project $project, Benefitiary $beneficiary)
    {
        $this->authorize('approve-beneficiaries', $project);

        $beneficiary->update([
            'internal_status' => Benefitiary::INTERNAL_STATUSES['approved'],
            'approved_at'     => now(),
            'approved_by'     => auth()->user()->id,
        ]);

        return redirect()->route('projects.show', $project);
    }
}

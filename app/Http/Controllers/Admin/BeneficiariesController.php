<?php

namespace App\Http\Controllers\Admin;

use App\Exports\BenefitiaryExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\BeneficiaryDataOnlyRequest;
use App\Http\Requests\BeneficiaryRequest;
use App\Http\Resources\BeneficiaryFormsResource;
use App\Http\Resources\BeneficiaryResource;
use App\Models\Benefitiary;
use App\Models\Form;
use App\Models\Program;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BeneficiariesController extends Controller
{

    public function __construct()
    {
        $this->middleware('can:Ver Beneficiarios')->only('index');
        $this->middleware('can:Registrar Beneficiarios')->only('create', 'store');
        $this->middleware('can:Editar Beneficiarios')->only('edit', 'update');
        $this->middleware('can:Eliminar Beneficiarios')->only('destroy');
        $this->middleware('can:Aprobar Beneficiarios')->only('approve');
    }

    public function index(Request $request)
    {
        return Inertia::render('Beneficiares/Index', [
            'beneficiaries_paginated' => Benefitiary::query()
                ->withTrashed()
                ->filter($request)
                ->beneficiaryStatus($request)
                ->withCount('projects')
                ->with('projects')
                ->latest('id')
                ->paginate(20)
                ->through(function ($beneficiary) {
                    return BeneficiaryResource::make($beneficiary);
                })
                ->withQueryString(),

            'beneficiaries' => Benefitiary::query()
                ->latest('id')
                ->select('id', 'uuid', 'name')
                ->get(),

            'projects' => Project::query()
                ->latest('id')
                ->select('id', 'uuid', 'project_name')
                ->with('programs')
                ->get(),

            'forms' => Form::query()
                ->latest('id')
                ->with('fields')
                ->select('id', 'form_name')
                ->get(),

            'fields' => Form::query()
                ->latest('id')
                ->get()
                ->map(function (Form $form) {
                    return $form->getFormFieldsWithValues();
                })->flatten(1),

            'programs' => Program::query()
                            ->select('id', 'program_name')
                            ->get(),
        ]);
    }

    public function create(BeneficiaryRequest $request)
    {
        if ($request->validated()['data_only'] === 'false') {
            $project = Project::findOrFail($request->validated()['project_id']);
            $programs = $project
                ->programs()
                ->with('forms')
                ->whereIn(
                    'id',
                    collect($request->input('programs'))
                        ->map(fn($program) => (int)$program)
                        ->toArray()
                )
                ->get();

            $forms = $programs->map(fn($program) => $program->forms->load('tabs.fields'))->flatten()->unique('id');

            return inertia('Beneficiares/Create', [
                'project'     => $project,
                'programs'    => $programs->pluck('id'),
                'forms'       => BeneficiaryFormsResource::collection($forms),
                'is_new'      => $request->validated()['is_new_beneficiary'] === 'true',
                'beneficiary' => $request->is_new_beneficiary === 'true'
                    ? $request->beneficiary_name
                    : BeneficiaryResource::make(
                        Benefitiary::with('answers.pivot.field')->findOrFail($request->beneficiary_id)
                    ),
            ]);
        }


        return inertia('Beneficiares/CreateDataOnly', [
            'forms'       => BeneficiaryFormsResource::collection(
                Form::query()
                    ->whereIn('id', $request->validated()['forms'])
                    ->get()
            ),
            'is_new'      => $request->validated()['is_new_beneficiary'] === 'true',
            'data_only'   => $request->validated()['data_only'] === 'true',
            'beneficiary' => $request->is_new_beneficiary === 'true'
                ? $request->beneficiary_name
                : BeneficiaryResource::make(
                    Benefitiary::with('answers.pivot.field')->findOrFail($request->beneficiary_id)
                ),
        ]);
    }

    public function edit(Benefitiary $beneficiary)
    {
        // Get the previous visited route
        return Inertia::render('Beneficiares/EditDataOnly', [
            'beneficiary' => BeneficiaryResource::make($beneficiary->load('answers.pivot.field.tab')),
            'forms'       => BeneficiaryFormsResource::collection($beneficiary->forms()->get()),
            'previous_route' => url()->previous(),
        ]);
    }

    public function show(Benefitiary $beneficiary)
    {
        return Inertia::render('Beneficiares/Show', [
            'beneficiary' => BeneficiaryResource::make($beneficiary),
            'projects'    => $beneficiary->projects,
            'forms'       => BeneficiaryFormsResource::collection($beneficiary->forms()->get()),
        ]);
    }


    public function store(BeneficiaryDataOnlyRequest $request)
    {

        $benefitiary = Benefitiary::create([
            'name'            => $request->validated()['name'],
            'internal_status' => auth()->user()->can(
                'Aprobar Beneficiarios'
            ) ? Benefitiary::INTERNAL_STATUSES['approved'] : Benefitiary::INTERNAL_STATUSES['pending'],
            'approved_at'     => auth()->user()->can('Aprobar Beneficiarios') ? now() : null,
        ]);

        $forms = Form::query()
            ->whereIn('id', collect($request->forms)->pluck('id')->toArray())
            ->get()
            ->each(function (Form $form) use ($benefitiary, $request) {
                $fields = $form->fields->mapWithKeys(function ($field) use ($request) {
                    //[$field['slug'] . '-' . $this->form_slug . '-' . $this->id]
                    return [$field->id => [
                        'value' => is_array(
                            $request->validated()[$field->getFieldFormattedSlug()]
                        )
                            ? json_encode($request->validated()[$field->getFieldFormattedSlug()])
                            : $request->validated()[$field->getFieldFormattedSlug()]

                    ]
                    ];
                })->toArray();

                $benefitiary->answers()->syncWithoutDetaching($fields);
            });

        $benefitiary->forms()->syncWithoutDetaching($forms);

        $url = Str::contains($request->previous_route,'/beneficiaries' ) ? redirect($request->previous_route) : redirect()->route('beneficiaries.index') ;
        return $url->with('success', 'Beneficiario creado correctamente');
    }

    public function update(BeneficiaryDataOnlyRequest $request, Benefitiary $beneficiary)
    {

        $beneficiary->update([
            'name'            => $request->validated()['name'],
            'internal_status' => (auth()->user()->can('Aprobar Beneficiarios') && $request->validated()['approve']) ? Benefitiary::INTERNAL_STATUSES['approved'] : Benefitiary::INTERNAL_STATUSES['pending'],
            'approved_at'     => (auth()->user()->can('Aprobar Beneficiarios') && $request->validated()['approve']) ? now() : null,
        ]);

        $forms = Form::query()
            ->whereIn('id', collect($request->forms)->pluck('id')->toArray())
            ->get()
            ->each(function (Form $form) use ($beneficiary, $request) {
                $fields = $form->fields->mapWithKeys(function ($field) use ($request) {
                    //[$field['slug'] . '-' . $this->form_slug . '-' . $this->id]
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

        $beneficiary->forms()->syncWithoutDetaching($forms);

        $url = Str::contains($request->previous_route,'/beneficiaries' ) ? redirect($request->previous_route) : redirect()->route('beneficiaries.index') ;
        return $url->with('success', 'Beneficiario creado correctamente');
    }

    public function destroy(Benefitiary $beneficiary)
    {
        $beneficiary->delete();
        return redirect()->route('beneficiaries.index');
    }


    public function approve(Benefitiary $beneficiary)
    {
        $beneficiary->update([
            'internal_status' => Benefitiary::INTERNAL_STATUSES['approved'],
            'approved_at'     => now(),
            'approved_by'     => auth()->user()->id,
        ]);
        return redirect()->route('beneficiaries.index');
    }

    public function reject(Benefitiary $beneficiary)
    {
        $beneficiary->update([
            'internal_status' => Benefitiary::INTERNAL_STATUSES['rejected'],
        ]);
        return redirect()->route('beneficiaries.index');
    }

    public function restore($id)
    {
        $beneficiary = Benefitiary::onlyTrashed()->findOrFail($id);
        $beneficiary->restore();
        $beneficiary->update([
            'internal_status' => Benefitiary::INTERNAL_STATUSES['approved'],
        ]);
        return redirect()->route('beneficiaries.index');
    }

    public function export(Request $request){
        return \Excel::download(new BenefitiaryExport($request),'participantes.xlsx');
    }
}

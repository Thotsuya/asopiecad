<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BeneficiaryDataOnlyRequest;
use App\Http\Requests\BeneficiaryRequest;
use App\Http\Resources\BeneficiaryFormsResource;
use App\Http\Resources\BeneficiaryResource;
use App\Models\Benefitiary;
use App\Models\Form;
use App\Models\Project;
use Inertia\Inertia;

class BeneficiariesController extends Controller
{

    public function __construct()
    {
        $this->middleware('can:Registrar Beneficiarios')->only('create', 'store');
        $this->middleware('can:Editar Beneficiarios')->only('edit', 'update');
        $this->middleware('can:Eliminar Beneficiarios')->only('destroy');
    }

    public function index()
    {
        return Inertia::render('Beneficiares/Index', [
            'beneficiaries_paginated' => Benefitiary::query()
                ->withCount('projects')
                ->with('projects')
                ->latest('id')
                ->paginate(6)
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
                ->get(),

            'forms' => Form::query()
                ->latest('id')
                ->select('id', 'form_name')
                ->get(),
        ]);
    }

    public function create(BeneficiaryRequest $request)
    {

        //return $request->validated();
        // Remove query string from url
        if ($request->validated()['data_only'] === 'false') {
            $project = Project::findOrFail($request->validated()['project_id']);
            return inertia('Beneficiares/Create', [
                'project' => $project,
                'forms' => BeneficiaryFormsResource::collection($project->forms()->get()),
                'is_new' => $request->validated()['is_new_beneficiary'] === 'true',
                'beneficiary' => $request->validated()['is_new_beneficiary'] === 'true' ? $request->validated()['beneficiary_name'] : BeneficiaryResource::make(Benefitiary::findOrFail($request->validated()['beneficiary_id'])->load('forms')),
            ]);
        }


        return inertia('Beneficiares/CreateDataOnly', [
            'forms' => BeneficiaryFormsResource::collection(
                Form::query()
                    ->whereIn('id', $request->validated()['forms'])
                    ->get()
            ),
            'is_new' => $request->validated()['is_new_beneficiary'] === 'true',
            'data_only' => $request->validated()['data_only'] === 'true',
            'beneficiary' => $request->validated()['is_new_beneficiary'] === 'true' ? $request->validated()['beneficiary_name'] : BeneficiaryResource::make(Benefitiary::findOrFail($request->validated()['beneficiary_id'])->load('forms')),
        ]);

    }

    public function edit(Benefitiary $beneficiary)
    {
        return Inertia::render('Beneficiares/EditDataOnly', [
            'beneficiary' => BeneficiaryResource::make($beneficiary->load('forms')),
            'forms' => BeneficiaryFormsResource::collection($beneficiary->forms()->get()),
        ]);
    }

    public function show(Benefitiary $beneficiary)
    {
        return Inertia::render('Beneficiares/Show', [
            'beneficiary' => BeneficiaryResource::make($beneficiary),
            'projects' => $beneficiary->projects,
            'forms' => BeneficiaryFormsResource::collection($beneficiary->forms()->get()),
        ]);
    }


    public function store(BeneficiaryDataOnlyRequest $request)
    {

        $forms = Form::query()
            ->whereIn('id', collect($request->forms)->pluck('id')->toArray())
            ->get()
            ->mapWithKeys(function (Form $form) use ($request) {
                $fields = $form->getFormFields();
                return [$form->id => [
                    'form_data' => json_encode(collect($request->validated())->only($fields)->toArray())
                ]];

            })->toArray();

        $benefitiary = Benefitiary::create([
            'name' => $request->validated()['name'],
            'internal_status' => auth()->user()->can('Aprobar beneficiarios') ? Benefitiary::INTERNAL_STATUSES['approved'] : Benefitiary::INTERNAL_STATUSES['pending'],
            'approved_at' => auth()->user()->can('Aprobar beneficiarios') ? now() : null,
        ]);

        $benefitiary->forms()->attach($forms);

        return redirect()->route('beneficiaries.index');
    }

    public function update(BeneficiaryDataOnlyRequest $request, Benefitiary $beneficiary)
    {
        $forms = Form::query()
            ->whereIn('id', collect($request->forms)->pluck('id')->toArray())
            ->get()
            ->mapWithKeys(function (Form $form) use ($request) {
                $fields = $form->getFormFields();
                return [$form->id => [
                    'form_data' => json_encode(collect($request->validated())->only($fields)->toArray())
                ]];

            })->toArray();

        $beneficiary->update([
            'name' => $request->validated()['name'],
            'internal_status' => auth()->user()->can('Aprobar beneficiarios') ? Benefitiary::INTERNAL_STATUSES['approved'] : Benefitiary::INTERNAL_STATUSES['pending'],
            'approved_at' => auth()->user()->can('Aprobar beneficiarios') ? now() : null,
        ]);

        $beneficiary->forms()->syncWithoutDetaching($forms);

        return redirect()->route('beneficiaries.index');
    }
}

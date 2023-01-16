<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FormsRequest;
use App\Http\Resources\FormsResource;
use App\Models\Form;
use Inertia\Inertia;

class FormController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:Ver Formularios')->only('index');
        $this->middleware('can:Crear Formularios')->only('create','store');
        $this->middleware('can:Editar Formularios')->only('edit','update');
        $this->middleware('can:Eliminar Formularios')->only('destroy');
    }

    public function index(){
        return Inertia::render('Forms/Index',[
            'forms' => Form::all()
        ]);
    }

    public function create(){
        return Inertia::render('Forms/Create');
    }

    public function edit(Form $form){
        return Inertia::render('Forms/Edit',[
            'form' => new FormsResource($form)
        ]);
    }

    public function store(FormsRequest $request)
    {

        //return collect($request->validated()['fields'])->toArray();

        $form_fields = collect($request->validated()['tabs'])->map(function ($tab) use ($request) {
            return [
                'tab_id' => $tab['id'],
                'tab_name' => $tab['name'],
                'tab_slug' => $tab['slug'],
                'editMode' => false,
                'order' => $tab['order'],
                'fields' => // Group fields whose tab_id is equal to the current tab_id
                    collect($request->validated()['fields'])->filter(function ($field) use ($tab) {
                        // Convert the field's tab_id to an integer
                        $field_tab_id = (int)$field['tab_id'];
                        return $field_tab_id === $tab['id'];
                    })->toArray()
            ];
        })->toArray();

        $form_data = [
            'form_name' => $request->validated()['form_name'],
            'form_fields' => $form_fields
        ];

        Form::create($form_data);

        return redirect()->route('forms.index');
    }

    public function update(FormsRequest $request, Form $form)
    {
        $form_fields = collect($request->validated()['tabs'])->map(function ($tab) use ($request) {
            return [
                'tab_id' => $tab['id'],
                'tab_name' => $tab['name'],
                'tab_slug' => $tab['slug'],
                'editMode' => false,
                'order' => $tab['order'],
                'fields' => // Group fields whose tab_id is equal to the current tab_id
                    collect($request->validated()['fields'])->filter(function ($field) use ($tab) {
                        // Convert the field's tab_id to an integer
                        $field_tab_id = (int)$field['tab_id'];
                        return $field_tab_id === $tab['id'];
                    })->toArray()
            ];
        })->toArray();

        $form_data = [
            'form_name' => $request->validated()['form_name'],
            'form_fields' => $form_fields
        ];

        $form->update($form_data);

        return redirect()->route('forms.index');
    }

    public function destroy(Form $form)
    {
        $form->delete();
        return redirect()->route('forms.index');
    }


}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FormsRequest;
use App\Http\Resources\FormsResource;
use App\Models\Form;
use Inertia\Inertia;

class FormController extends Controller
{
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


}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FormsRequest;
use App\Http\Resources\FormsResource;
use App\Models\Form;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Traits\FieldFormatter;

class FormController extends Controller
{

    use FieldFormatter;

    public function __construct()
    {
        $this->middleware('can:Ver Formularios')->only('index');
        $this->middleware('can:Crear Formularios')->only('create','store');
        $this->middleware('can:Editar Formularios')->only('edit','update');
        $this->middleware('can:Eliminar Formularios')->only('destroy');
    }

    public function index(){
        return Inertia::render('Forms/Index',[
            'forms' => Form::withCount('fields')->get(),
        ]);
    }

    public function create(){
        return Inertia::render('Forms/Create');
    }

    public function edit(Form $form){
        return Inertia::render('Forms/Edit',[
            'form' => new FormsResource($form->load('tabs','fields'))
        ]);
    }

    public function store(FormsRequest $request)
    {

        $form_fields = $this->formatFields($request);

        DB::transaction(function () use ($request, $form_fields) {
            $form = Form::create([
                'form_name' => $request->validated()['form_name'],
            ]);

            $form_fields->each(function ($tab) use ($form) {
                $form->tabs()->create([
                    'tab_name' => $tab['tab_name'],
                ])->fields()->createMany($tab['fields']);
            });
        });

        return redirect()->route('forms.index');
    }

    public function update(Request $request, Form $form)
    {
        $form->update([
            'form_name' => $request->form_name,
        ]);

        return redirect()->route('forms.index');
    }

    public function destroy(Form $form)
    {
        $form->delete();
        return redirect()->route('forms.index');
    }


}

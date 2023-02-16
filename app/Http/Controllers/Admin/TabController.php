<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Form;
use App\Models\Tab;
use Illuminate\Http\Request;

class TabController extends Controller
{
    public function store(Form $form, Request $request){
        $request->validate([
            'tab_name' => 'required',
        ],[
            'tab_name.required' => 'El nombre de la pestaña es requerido',
        ]);

        $form->tabs()->create([
            'tab_name' => $request->tab_name,
        ]);

        return redirect()->route('forms.edit',$form);
    }

    public function update(Tab $tab, Request $request){
        $request->validate([
            'tab_name' => 'required',
        ],[
            'tab_name.required' => 'El nombre de la pestaña es requerido',
        ]);

        $tab->update([
            'tab_name' => $request->tab_name,
        ]);

        return redirect()->route('forms.edit',$tab->form);
    }

    public function destroy(Tab $tab){
        $form = $tab->form;
        $tab->delete();
        return redirect()->route('forms.edit',$form);
    }

    public function order(Form $form, Request $request){
        collect($request->tabs)->each(function($tab, $index){
            Tab::find($tab)->update([
                'order' => $index,
            ]);
        });

        return redirect()->route('forms.edit',$form);
    }
}

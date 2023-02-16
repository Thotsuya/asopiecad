<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FieldRequest;
use App\Models\Tab;
use Illuminate\Http\Request;

class FieldController extends Controller
{
    public function store(Tab $tab, FieldRequest $request){
        $tab->fields()->create($request->validated());
        return redirect()->route('forms.edit',$tab->form);
    }
}

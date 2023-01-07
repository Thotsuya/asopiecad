<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FormController extends Controller
{
    public function index(){
        return Inertia::render('Forms/Index');
    }

    public function create(){
        return Inertia::render('Forms/Create');
    }
}

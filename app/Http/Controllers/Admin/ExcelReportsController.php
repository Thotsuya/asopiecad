<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ExcelReports;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExcelReportsController extends Controller
{
    //

    public function index(){
        return Inertia::render('ExcelReports/Index',[
            'excelReports' => ExcelReports::query()->latest()->paginate(20)
        ]);
    }
}

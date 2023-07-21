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

        //Get the pending queue jobs from the database

        return Inertia::render('ExcelReports/Index',[
            'pendingReports' => ExcelReports::query()
                                            ->pending()
                                            ->latest()
                                            ->get(),
            'excelReports' => ExcelReports::query()
                                            ->generated()
                                            ->latest()
                                            ->paginate(20)
        ]);
    }
}

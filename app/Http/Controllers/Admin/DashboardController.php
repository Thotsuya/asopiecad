<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Screening;
use App\Services\DashboardDataService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->dashboardData = new DashboardDataService();
    }

    public function __invoke()
    {
        return Inertia::render('Dashboard',$this->dashboardData->getDashboardIndicators());
    }
}

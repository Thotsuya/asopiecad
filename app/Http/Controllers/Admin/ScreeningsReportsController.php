<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Screening;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScreeningsReportsController extends Controller
{
    public function __invoke(Request $request)
    {
        $screenings = Screening::query();

         // Group the screenings by gender and count them
        $screenings_per_gender = Screening::query()
            ->selectRaw('gender as label, count(*) as value')
            ->filterByType($request->project)
            ->groupBy('label')
            ->get();

        // Group the screenings by department and count them
        $screenings_per_department = Screening::query()
            ->selectRaw('department as label, count(*) as value')
            ->filterByType($request->project)
            ->groupBy('label')
            ->get();

        // Group the screenings by age and count them
        $screenings_per_age = Screening::query()
            ->selectRaw('age as label, count(*) as value')
            ->filterByType($request->project)
            ->groupBy('label')
            ->get();



        return inertia('Screenings/Report',[
            'screenings_per_gender' => $screenings_per_gender,
            'screenings_per_department' => $screenings_per_department,
            'screenings_per_age' => $screenings_per_age,
        ]);
    }
}

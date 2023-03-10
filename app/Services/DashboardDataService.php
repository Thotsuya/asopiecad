<?php

namespace App\Services;

use App\Models\Benefitiary;
use App\Models\Screening;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DashboardDataService
{

    public function getDashboardIndicators()
    {

        $colors = [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
        ];
        $totalScreenings = Screening::count();
        $screenings_per_year_by_month =
            //Group the screenings by month and year, with Full month name in Spanish and the count of screenings and year
            Screening::selectRaw('count(*) as count, year(created_at) year, monthname(created_at) month')
                ->groupBy('year', 'month')
                ->orderBy('year', 'desc')
                ->orderBy('month', 'desc')
                ->get()
                //Group the screenings by year, with the count of screenings and year
                ->groupBy('year')
                ->map(function ($item) {
                    return $item->map(function ($item) {
                        return [
                            'label' => Str::ucfirst(Carbon::parse($item->month)->translatedFormat('F'),),
                            'value' => $item->count,
                        ];
                    });
                });

        $labels = $screenings_per_year_by_month->map(function ($item) {
            return $item->pluck('label');
        })->flatten()->unique()->values();

        $datasets = $screenings_per_year_by_month->map(function ($item, $key) use ($colors) {

            $color = $colors[rand(0, count($colors) - 1)];
            return [
                'id' => rand(1, 1000),
                'label' => $key,
                'data' => $item->pluck('value'),
                //Generate a random color for the dataset
                'backgroundColor' => $color,
                'borderColor' =>  $color,
            ];
        })->values();


        $total_beneficiaries = Benefitiary::count();
        $total_projects = auth()->user()->projects->count();

        $incoming_appointments = Benefitiary::query()
            ->whereHas('appointments', function ($query) {
                $query->where(DB::raw('DATE_ADD(start_date, INTERVAL 3 MONTH)'), '>', Carbon::now());
            })
            ->with('appointments.benefitiary')
            ->get()
            ->map(function ($beneficiary) {
                return $beneficiary->appointments->map(function ($appointment) {
                    return [
                        'id' => $appointment->id,
                        'start_date' => $appointment->start_date->translatedFormat('l j F Y'),
                        'end_date' => $appointment->end_date,
                        'next_appointment' => Carbon::parse($appointment->start_date)->addMonths(3)->translatedFormat('l d F Y'),
                        'beneficiary' => $appointment->benefitiary->name,
                    ];
                });
            })->flatten(1);

        $latest_screenings
            = Screening::query()
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return [
            'screenings_per_year_by_month' => $screenings_per_year_by_month,
            'total_screenings'             => $totalScreenings,
            'total_beneficiaries'          => $total_beneficiaries,
            'total_projects'               => $total_projects,
            'incoming_appointments'        => $incoming_appointments,
            'latest_screenings'            => $latest_screenings,
            'labels'                       => $labels,
            'datasets'                     => $datasets,

        ];
    }

}

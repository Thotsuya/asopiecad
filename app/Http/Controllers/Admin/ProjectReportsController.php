<?php

namespace App\Http\Controllers\Admin;

use App\Exports\ProjectExport;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Traits\DynamicComparisons;
use App\Traits\ReportResults;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class ProjectReportsController extends Controller
{

    use DynamicComparisons, ReportResults;

    public function index(Request $request, Project $project)
    {

        $colors = [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
        ];

        $project->load(['beneficiaries.appointments'])->loadCount(['beneficiaries']);

        $goals = $project
            ->goals()
            ->with([
                'program' => [
                    'forms',
                    'beneficiaries' => function ($query) use ($request) {
                        $query->with([
                            'answers.pivot.field',
                            'appointments'
                        ])
                            ->whereNotNull('approved_at')
                            ->when(
                            $request->has('start_date') && $request->has('end_date'),
                            function ($query) use ($request) {
                                $query->whereBetween(
                                    'benefitiary_program.created_at',
                                    [$request->date('start_date')->startOfDay(), $request->date('end_date')->endOfDay()]
                                );
                            }
                        );
                    },
                    'project'
                ]
            ])
            ->orderBy(function ($query) {
                $query->select('order')
                    ->from('programs')
                    ->whereColumn('programs.id', 'goals.program_id')
                    ->orderBy('order', 'desc')
                    ->limit(1);
            })
            ->get();

        $beneficiaries = $project
            ->beneficiaries()
            ->approved()
            ->with([
                'forms',
                'programs',
                'appointments'
            ])
            ->when($request->has('start_date') && $request->has('end_date'), function ($query) use ($request) {
                $query->whereBetween('benefitiary_project.created_at', [$request->start_date, $request->end_date]);
            })
            ->get();


        $labels = $beneficiaries->groupBy(function ($beneficiary) {
            return $beneficiary->created_at->format('m');
        })->keys()->map(function ($key) {
            return ucfirst(Carbon::createFromDate(null, $key)->translatedFormat('F'));
        });

        $datasets = $beneficiaries->groupBy(function ($beneficiary) {
            return $beneficiary->created_at->format('Y');
        })->map(function($beneficiaries, $key) use($colors) {

            $color = $colors[rand(0, count($colors) - 1)];
            return [
                'label' => $key,
                'data' => $beneficiaries->groupBy(function ($beneficiary) {
                    return $beneficiary->created_at->format('m');
                })->map(function ($beneficiaries) {
                    return $beneficiaries->count();
                })->values()->toArray(),
                'backgroundColor' => $color,
                'borderColor' =>  $color,
            ];
        })->values()->toArray();

        $results = $this->getProjectResults($goals);
        $headers = $this->getHeaders($results);
        $globalResults = $this->getGlobalResults($project, $results);

        return inertia('Reports/Show', [
            'project' => $project,
            'global' => $globalResults,
            'results' => $results->toArray(),
            'labels' => $labels,
            'datasets' => $datasets,
            'headers' => $headers,
            'start_date' => $request->date('start_date') ? $request->date('start_date')->translatedFormat('l d F Y') : null,
            'end_date' => $request->date('end_date') ? $request->date('end_date')->translatedFormat('l d F Y') : null,
            'screenings' => $this->getScreeningsReport(),
        ]);
    }

    public function export(Request $request, Project $project)
    {
        return (new ProjectExport($project, $request))->download(
            'reportes-proyecto-' . $project->project_name . '.xlsx'
        );
    }

}

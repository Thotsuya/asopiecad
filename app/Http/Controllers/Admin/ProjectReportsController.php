<?php

namespace App\Http\Controllers\Admin;

use App\Exports\ProjectExport;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Traits\DynamicComparisons;
use App\Traits\ReportResults;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectReportsController extends Controller
{

    use DynamicComparisons, ReportResults;

    public function index(Request $request, Project $project)
    {
        $project->load(['beneficiaries']);

        $goals = $project->goals()
            ->with([
                'program' => [
                    'forms',
                    'beneficiaries' => function ($query) use ($request) {
                        $query->with([
                            'answers.pivot.field',
                            'appointments'
                        ])->when(
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
            ->get();

        $beneficiaries = $project->beneficiaries()
            ->with([
                'forms',
                'programs'
            ])
            ->when($request->has('start_date') && $request->has('end_date'), function ($query) use ($request) {
                $query->whereBetween('benefitiary_project.created_at', [$request->start_date, $request->end_date]);
            })
            ->get()
            ->groupBy(function ($beneficiary) {
                return $beneficiary->pivot->created_at->format('m');
            })
            ->map(function ($beneficiaries, $month) {
                return [
                    'label' => Str::title($beneficiaries->first()->pivot->created_at->translatedFormat('F')),
                    'value' => $beneficiaries->count(),
                ];
            })
            ->sortBy(function ($beneficiary) {
                return $beneficiary['label'];
            })
            ->values();

        $results = $this->getProjectResults($goals);
        $headers = $this->getHeaders($results);

        return inertia('Reports/Show', [
            'project' => $project,
            'results' => $results->toArray(),
            'beneficiaries' => $beneficiaries,
            'headers' => $headers,
            'start_date' => $request->date('start_date') ? $request->date('start_date')->translatedFormat('l d F Y') : null,
            'end_date' => $request->date('end_date') ? $request->date('end_date')->translatedFormat('l d F Y') : null,
        ]);
    }

    public function export(Request $request, Project $project)
    {
        return (new ProjectExport($project, $request))->download(
            'reportes-proyecto-' . $project->project_name . '.xlsx'
        );
    }

}

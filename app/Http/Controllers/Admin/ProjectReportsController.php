<?php

namespace App\Http\Controllers\Admin;

use App\Exports\ProjectExport;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Traits\DynamicComparisons;
use App\Traits\ReportResults;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class ProjectReportsController extends Controller
{

    use DynamicComparisons, ReportResults;

    public function index(Project $project)
    {

        $data = Cache::remember('project-results'.$project->uuid, now()->addMinutes(5), function () use ($project) {

            $project->load('beneficiaries.appointments');

            $goals = $project->goals()
                ->with('program.forms')
                ->with('program.beneficiaries')
                ->with('program.beneficiaries.forms')
                ->with('program.beneficiaries.answers.pivot.field')
                ->with('program.beneficiaries.appointments')
                ->get();

            $beneficiaries = $project->beneficiaries()
                ->with('forms')
                ->with('appointments')
                ->with('answers.pivot.field')
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
                // Sort the collection by the month number
                ->sortBy(function ($beneficiary) {
                    return $beneficiary['label'];
                })
                ->values();

            $results = $this->getProjectResults($goals);

            $global = $this->getGlobalResults($project,$results);

            return [
                'project' => $project,
                'results' => $results->toArray(),
                'global' => $global,
                'beneficiaries' => $beneficiaries,
            ];
        });


        return inertia('Reports/Show', $data);
    }

    public function export(Project $project)
    {
        return (new ProjectExport($project))->download('reportes-proyecto-'.$project->project_name.'.xlsx');
    }

}

<?php

namespace App\Http\Controllers\Admin;

use App\Exports\ProjectExport;
use App\Http\Controllers\Controller;
use App\Http\Resources\MeetingResource;
use App\Jobs\ExportBenefitiariesReportToExcel;
use App\Models\Project;
use App\Traits\DynamicComparisons;
use App\Traits\ReportResults;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
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

        $project = $project
            ->load([
                'beneficiaries',
                'meetings.participants',
                'groupedResults.goals',
                'groupedResults.meetings'
            ])

            ->loadCount(['beneficiaries','meetings']);

        $consultations_count = $project->beneficiaries->sum('consultations_count');


        $results = $project->report->fields;

        $headers = $this->getHeaders(collect($results));

        $globalResults = $project->report->global_fields;


        return inertia('Reports/Show', [
            'project' => $project,
            'global' => $globalResults,
            'results' => $results,
            'headers' => $headers,
            'start_date' => $request->date('start_date') ? $request->date('start_date')->translatedFormat('l d F Y') : null,
            'end_date' => $request->date('end_date') ? $request->date('end_date')->translatedFormat('l d F Y') : null,
            'screenings' => Cache::remember('screenings-' . $project->id, 60 * 15, function () use ($project) {
                return $this->getScreeningsReport($project->id === 1 ? 'P-4211' : 'P-4353');
            }),
            'meeting_goals' => MeetingResource::collection($project->meetings),
            'consultations_count' => $consultations_count,
        ]);
    }

    public function export(Request $request, Project $project)
    {
        ExportBenefitiariesReportToExcel::dispatch($project->load('report'), $request->all());
        return back()->with('success', 'Report is being generated, you will receive an email with the download link');
    }

}

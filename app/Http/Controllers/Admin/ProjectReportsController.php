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
use Illuminate\Support\Facades\DB;
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

// Load only necessary relationships
        $project->load(['meetings.participants', 'groupedResults.goals', 'groupedResults.meetings']);

// Efficiently calculate consultations count
        $consultations_count = DB::table('benefitiaries')
            ->join('benefitiary_project', 'benefitiaries.id', '=', 'benefitiary_project.benefitiary_id')
            ->where('benefitiary_project.project_id', $project->id)
            ->sum('benefitiaries.consultations_count');

        $results = Cache::remember('project-results-' . $project->id, 60 * 15, function () use ($project) {
            return $project->report->fields;
        });

        $headers = Cache::remember('headers-' . $project->id, 60 * 15, function () use ($results) {
            return $this->getHeaders(collect($results));
        });

        $screenings = Cache::remember('screenings-' . $project->id, 60 * 15, function () use ($project) {
            return $this->getScreeningsReport('P-4353');
        });

        return inertia('Reports/Show', [
            'project' => $project,
            'results' => $results,
            'headers' => $headers,
            // Additional data as necessary
            'consultations_count' => $consultations_count,
            'screenings' => $screenings,
            // Other required fields...
        ]);
    }

    public function export(Request $request, Project $project)
    {
        ExportBenefitiariesReportToExcel::dispatch($project->load('report'), $request->all());
        return back()->with('success', 'Report is being generated, you will receive an email with the download link');
    }

}

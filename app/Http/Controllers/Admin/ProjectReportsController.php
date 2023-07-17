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

        $project
            ->load([
                'beneficiaries',
                'meetings.participants',
                'groupedResults.goals',
                'groupedResults.meetings',
            ])

            ->loadCount(['beneficiaries','meetings']);


        $beneficiaries = $project
            ->beneficiaries()
            ->approved()
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



        $results = $project->report->fields;
        $headers = $this->getHeaders(collect($results));
        $globalResults = $project->report->global_fields;


        return inertia('Reports/Show', [
            'project' => $project,
            'global' => $globalResults,
            'results' => $results,
            'labels' => $labels,
            'datasets' => $datasets,
            'headers' => $headers,
            'start_date' => $request->date('start_date') ? $request->date('start_date')->translatedFormat('l d F Y') : null,
            'end_date' => $request->date('end_date') ? $request->date('end_date')->translatedFormat('l d F Y') : null,
            'screenings' => $this->getScreeningsReport(),
            'meeting_goals' => MeetingResource::collection($project->meetings)
        ]);
    }

    public function export(Request $request, Project $project)
    {
        ExportBenefitiariesReportToExcel::dispatch($project, $request->all());
        return back()->with('success', 'Report is being generated, you will receive an email with the download link');
    }

}

<?php

namespace App\Exports;

use App\Models\Project;
use App\Traits\DynamicComparisons;
use App\Traits\ReportResults;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;

class ProjectExport implements FromView
{
    use Exportable, ReportResults, DynamicComparisons;

    public function __construct(Project $project, Request $request)
    {
        $this->project = $project;
        $this->request = $request;
    }

    public function view(): View
    {
        $goals = $this->project->goals()
            ->with([
                'program' => [
                    'forms',
                    'beneficiaries' => function ($query) {
                        $query->with([
                            'answers.pivot.field',
                            'appointments'
                        ])->when(
                            $this->request->has('start_date') && $this->request->has('end_date'),
                            function ($query) {
                                $query->whereBetween(
                                    'benefitiary_program.created_at',
                                    [$this->request->start_date, $this->request->end_date]
                                );
                            }
                        );
                    },
                    'project'
                ]
            ])
            ->get();

        $results = $this->getProjectResults($goals);
        $global = $this->getGlobalResults($this->project, $results);

        $headers = $this->getHeaders($results);

        return view('reports', [
            'project' => $this->project,
            'results' => $results->toArray(),
            'global'  => $global,
            'headers' => $headers,
        ]);
    }
}


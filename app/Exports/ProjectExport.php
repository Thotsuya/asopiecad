<?php

namespace App\Exports;

use App\Models\Project;
use App\Traits\DynamicComparisons;
use App\Traits\ReportResults;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class ProjectExport implements FromView
{
    use Exportable, ReportResults, DynamicComparisons;

    public function __construct(Project $project)
    {
        $this->project = $project;
    }

    public function view(): View
    {

        $goals = $this->project->goals()
            ->with('program.forms')
            ->with('program.beneficiaries')
            ->with('program.beneficiaries.forms')
            ->with('program.beneficiaries.answers.pivot.field')
            ->with('program.beneficiaries.appointments')
            ->get();

        $results = $this->getProjectResults($goals);

        $global = $this->getGlobalResults($this->project,$results);

        return view('reports', [
            'project' => $this->project,
            'results' => $results->toArray(),
            'global' => $global
        ]);
    }
}


<?php

namespace App\Exports;

use App\Models\Project;
use App\Traits\DynamicComparisons;
use App\Traits\ReportResults;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeExport;

class ProjectExport implements FromView, WithEvents
{
    use Exportable, ReportResults, DynamicComparisons;

    public function __construct(Project $project, $request)
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
                            $this->request['start_date'] && $this->request['end_date'],
                            function ($query) {
                                $query->whereBetween(
                                    'benefitiary_program.created_at',
                                    [$this->request['start_date'], $this->request['end_date']]
                                );
                            }
                        );
                    },
                    'project'
                ]
            ])
            ->get();

        $meetings = $this->project->meetings()->sortBy('order')->get();

        $results = $this->getProjectResults($goals,$meetings);
        $global = $this->getGlobalResults($this->project, $results);

        $headers = $this->getHeaders($results);

        return view('reports', [
            'project' => $this->project,
            'results' => $results->toArray(),
            'global'  => $global,
            'headers' => $headers,
        ]);
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                // Set the font to Verdana and the font size to 10
                $event->sheet
                    ->getStyle('A1:Z100')
                    ->getFont()
                    ->setName('Verdana');
            },
        ];
    }
}


<?php

namespace App\Console\Commands;

use App\Traits\DynamicComparisons;
use App\Traits\ReportResults;
use Illuminate\Console\Command;

class UpdateProjectReportTableFile extends Command
{
    use ReportResults, DynamicComparisons;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asopiecad:update-project-report-table {--project=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Updates Only the project_reports table for a given project';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $projectId = $this->option('project');

        $project = \App\Models\Project::query()
            ->where('projects.id', $projectId)
            ->with([
                'goals' => function ($query) {
                    $query
                        ->with([
                            'program' => function ($query) {
                                $query->select('programs.id', 'program_name', /* other necessary fields */)
                                    //Sum the total appointments
                                    ->with(['forms' => function ($query) {
                                        $query->select('forms.id', 'program_id', /* other necessary fields */);
                                    }])
                                    ->with(['project' => function ($query) {
                                        $query->select('projects.id', /* other necessary fields */);
                                    }])
                                    ->with(['beneficiaries' => function ($query) {
                                        $query
                                            ->select('benefitiaries.id', 'name', 'consultations_count' /* other necessary fields */)
                                            ->whereNotNull('approved_at')
                                            ->with(['answers.pivot.field' /* other necessary fields */])
                                            ->withCount('appointments');
                                    }]);
                            },
                        ])
                        ->orderBy(function ($query) {
                            $query->select('order')
                                ->from('programs')
                                ->whereColumn('programs.id', 'goals.program_id')
                                ->orderBy('order', 'desc')
                                ->limit(1);
                        });
                }
            ])
            ->first();

        dd($project);

        //If needed, load beneficiaries separately in a more controlled manner

        $this->info('=============================================================================================================================');
        $this->comment('Updating Report for Project ' . $project->project_name . '...');
        $meetings = $project->meetings()->orderBy('order')->cursor();
        $inventory = $project->inventory()->with('inventoryItems')->cursor();

        $results = $this->getProjectResultsOptimizedForLowMemUsage($project, $meetings, $inventory);

        $project->report()->updateOrCreate(
            ['project_id' => $project->id],
            [
                'title' => $project->project_name,
                'fields' => $results,
                'global_fields' => [],
                'generated_at' => now()
            ]
        );

        $this->info('=============================================================================================================================');
        //dump the memory usage
        dd(memory_get_usage());
    }
}

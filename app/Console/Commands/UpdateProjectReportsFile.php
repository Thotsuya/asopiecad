<?php

namespace App\Console\Commands;

use App\Models\Project;
use Illuminate\Console\Command;
use App\Traits\ReportResults;
use App\Traits\DynamicComparisons;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class UpdateProjectReportsFile extends Command
{
    use ReportResults, DynamicComparisons;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asopiecad:update-project-reports-table';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scheduled every 15 minutes to update the project_reports table';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->comment('Fetching projects...');

        $projects = Project::query()->cursor()->each(function ($project) {
            $this->info('=============================================================================================================================');
            $this->comment('Updating Report for Project ' . $project->project_name . '...');

            $goals = $project
                ->goals()
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
                                    ->select('benefitiaries.id', 'name','consultations_count' /* other necessary fields */)
                                    ->whereNotNull('approved_at')
                                    ->withCount('appointments');
                            }])
                            ->withCount(['beneficiaries as total_beneficiaries' => function ($query) {
                                $query->whereNotNull('approved_at');
                            }]);
                    },
                ])
                ->orderBy(function ($query) {
                    $query->select('order')
                        ->from('programs')
                        ->whereColumn('programs.id', 'goals.program_id')
                        ->orderBy('order', 'desc')
                        ->limit(1);
                })
                ->cursor();

            $meetings = $project->meetings()->orderBy('order')->cursor();
            $inventory = $project->inventory()->with('inventoryItems')->cursor();

//            $results = $this->getProjectResults($goals,$meetings,$inventory);

            $report = $this->getProjectResultsOptimizedForLowMemUsage($project,$meetings,$inventory);

            $project->report()->updateOrCreate(
                ['project_id' => $project->id],
                [
                    'title' => $project->project_name,
                    'fields' => $report,
                    'global_fields' => [],
                    'generated_at' => now()
                ]
            );

            $this->info('Report for Project ' . $project->project_name . ' updated!');

            // Consider garbage collection if memory usage is still high
            gc_collect_cycles();


        });


        $this->comment('=============================================================================================');
        $this->info('All Project Reports updated!');
    }
}

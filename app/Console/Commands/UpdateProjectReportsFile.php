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
                    'program' => [
                        'forms',
                        'beneficiaries' => function ($query) {
                            $query->with([
                                'answers.pivot.field',
                                'appointments'
                            ])
                                ->whereNotNull('approved_at');
                        },
                        'project'
                    ]
                ])
                ->orderBy(function ($query) {
                    $query->select('order')
                        ->from('programs')
                        ->whereColumn('programs.id', 'goals.program_id')
                        ->orderBy('order', 'desc')
                        ->limit(1);
                })
                ->get();

            $meetings = $project->meetings()->orderBy('order')->get();
            $inventory = $project->inventory()->with('inventoryItems')->get();

            $results = $this->getProjectResults($goals,$meetings,$inventory);

            $project->report()->updateOrCreate(
                ['project_id' => $project->id],
                [
                    'title' => $project->project_name,
                    'fields' => $results,
                    'global_fields' => [],
                    'generated_at' => now()
                ]
            );

            $this->info('Report for Project ' . $project->project_name . ' updated!');


            $this->comment('Updating Grouped Results for project:  ' . $project->project_name . '...');

            $project->groupedResults->each(function ($groupedResult) use ($project,$results) {
                $newGroupedResults = $groupedResult->goals->mapWithKeys(function ($goal) use ($project,$results) {
                    return [
                        $goal->id => [
                            'value' => json_encode(collect($results)->where('id', $goal->id)->where('type', 'goal')->first())
                        ]
                    ];
                });

                $groupedResult->goals()->syncWithoutDetaching($newGroupedResults);

                $newGroupedMeetingResults = $groupedResult->meetings->mapWithKeys(function ($meeting) use ($project,$results) {
                    return [
                        $meeting->id => [
                            'value' => json_encode(collect($results)->where('id', $meeting->id)->where('type', 'meeting')->first())
                        ]
                    ];
                });

                $groupedResult->meetings()->syncWithoutDetaching($newGroupedMeetingResults);
            });

            $this->info('Grouped Results for project:  ' . $project->project_name . ' updated!');

            $this->info('Caching results');

            Cache::forget('project-results-' . $project->id);
            Cache::forget('headers-' . $project->id);
            Cache::forget('screenings-' . $project->id);

            Cache::remember('project-results-' . $project->id, 60 * 15, function () use ($project) {
                return $project->report->fields;
            });

            Cache::remember('headers-' . $project->id, 60 * 15, function () use ($results) {
                return $this->getHeaders(collect($results));
            });

            Cache::remember('screenings-' . $project->id, 60 * 15, function () use ($project) {
                return $this->getScreeningsReport('P-4353');
            });

            unset($results, $globalResults, $newGroupedResults, $newGroupedMeetingResults, $goals, $meetings, $inventory,$project);

            // Consider garbage collection if memory usage is still high
            gc_collect_cycles();

            $this->info('Results cached!');

        });


        $this->comment('=============================================================================================');
        $this->info('All Project Reports updated!');
    }
}

<?php

namespace App\Console\Commands;

use App\Models\Project;
use Illuminate\Console\Command;
use App\Traits\ReportResults;
use App\Traits\DynamicComparisons;

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

        $projects = Project::all()->each(function ($project) {
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

            $results = $this->getProjectResults($goals);
            $globalResults = $this->getGlobalResults($project,$results);

            $project->report()->updateOrCreate(
                ['project_id' => $project->id],
                [
                    'title' => $project->project_name,
                    'fields' => $results,
                    'global_fields' => $globalResults,
                    'generated_at' => now()
                ]
            );

            $this->info('Report for Project ' . $project->project_name . ' updated!');

        });

        $this->info('All Project Reports updated!');
    }
}

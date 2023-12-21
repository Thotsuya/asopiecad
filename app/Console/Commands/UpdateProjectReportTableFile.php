<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class UpdateProjectReportTableFile extends Command
{
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
        $project = $this->option('project');

        $project = \App\Models\Project::query()
            ->where('id', $project)
            ->with([
                'goals' => function ($query) {
                    $query->select('id', 'project_id', 'program_id', /* other necessary fields */)
                        ->with([
                            'program' => function ($query) {
                                $query->select('id', 'program_name', /* other necessary fields */)
                                    ->with(['forms' => function ($query) {
                                        $query->select('id', 'program_id', /* other necessary fields */);
                                    }])
                                    ->with(['project' => function ($query) {
                                        $query->select('id', /* other necessary fields */);
                                    }]);
                            }
                        ])
                        ->orderBy('order');
                }
            ])
            ->first(['id', /* other necessary fields of Project */]);

        // If needed, load beneficiaries separately in a more controlled manner
        $beneficiaries = $project->goals->flatMap(function ($goal) {
            return $goal->program->beneficiaries()
                ->whereNotNull('approved_at')
                ->with(['answers.pivot.field', 'appointments'])
                ->get(['id', 'program_id', /* other necessary fields */]);
        });

        $this->info('=============================================================================================================================');
        dd($project);

        //dump the memory usage
        dd(memory_get_usage());



        }
}

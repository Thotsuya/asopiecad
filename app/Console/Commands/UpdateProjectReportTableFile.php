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
                    $query->with([
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
                                ->orderBy('order', 'desc');
                        });
                }
            ])
            ->first();

        $this->info('=============================================================================================================================');
        dd($project);

        //dump the memory usage
        dd(memory_get_usage());



        }
}

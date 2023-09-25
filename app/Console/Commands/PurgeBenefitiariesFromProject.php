<?php

namespace App\Console\Commands;

use App\Models\Benefitiary;
use Illuminate\Console\Command;

class PurgeBenefitiariesFromProject extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */

    // asopiecad:purge-beneficiaries-from-project --project=1
    protected $signature = 'asopiecad:purge-beneficiaries-from-project {--project=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Purge beneficiaries from project';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $project = $this->option('project');

        if (!$project) {
            $this->error('Project id is required');
            return 1;
        }

        $project = \App\Models\Project::find($project);

        if (!$project) {
            $this->error('Project not found');
            return 1;
        }

        $this->info('Project: ' . $project->project_name);

        $beneficiaries =
            \App\Models\Benefitiary::query()
                ->
                whereHas('projects', function ($query) use ($project) {
                    $query->where('projects.id', $project->id);
                })
                ->cursor()
                ->each(function (Benefitiary $beneficiary) use ($project) {

                    $beneficiary->answers()->detach();
                    $beneficiary->projects()->detach($project->id);

                    $beneficiary->forms()->detach();
                    $beneficiary->programs()->detach();
                    $beneficiary->appointments()->forceDelete();

                    $beneficiary->forceDelete();
                });

        $this->info('Purging beneficiaries...');
        $this->info('Done!');

        return 0;
    }
}

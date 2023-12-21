<?php

namespace App\Console\Commands;

use App\Models\Project;
use App\Traits\DynamicComparisons;
use App\Traits\ReportResults;
use Illuminate\Console\Command;

class UpdateProjectReportsGroupedResults extends Command
{
    use DynamicComparisons, ReportResults;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asopiecad:update-project-reports-grouped-results';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Updates the project_reports table with grouped results';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Project::query()
            ->cursor()
            ->each(function ($project) {
                $this->info('=============================================================================================================================');
                $this->comment('Updating ( Grouped Results ) Report for Project ' . $project->project_name . '...');
                $this->info('=============================================================================================================================');

                $project->groupedResults->each(function ($groupedResult) use ($project) {
                    $newGroupedResults = $groupedResult->goals->mapWithKeys(function ($goal) use ($project) {
                        return [
                            $goal->id => [
                                'value' => json_encode(collect($project->report->fields)->where('id', $goal->id)->where('type', 'goal')->first())
                            ]
                        ];
                    });

                    $groupedResult->goals()->syncWithoutDetaching($newGroupedResults);

                    $newGroupedMeetingResults = $groupedResult->meetings->mapWithKeys(function ($meeting) use ($project) {
                        return [
                            $meeting->id => [
                                'value' => json_encode(collect($project->report->fields)->where('id', $meeting->id)->where('type', 'meeting')->first())
                            ]
                        ];
                    });

                    $groupedResult->meetings()->syncWithoutDetaching($newGroupedMeetingResults);
                });

                $this->info('Grouped Results for project:  ' . $project->project_name . ' updated!');

            });

    }
}

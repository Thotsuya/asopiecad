<?php

namespace App\Console\Commands;

use App\Models\Project;
use App\Traits\DynamicComparisons;
use App\Traits\ReportResults;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class CalculateScreenings extends Command
{
    use DynamicComparisons, ReportResults;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asopiecad:calculate-screenings';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Calculating screenings...');
        Cache::remember('screenings-report-P-4353', 60 * 60 * 4, function () {
            return $this->getScreeningsReport('P-4353');
        });

        Cache::remember('screenings-report-P-4211', 60 * 60 * 4, function () {
            return $this->getScreeningsReport('P-4211');
        });

        $this->info('Screenings calculated successfully');

        //Caching Project Reports
        Project::all()->each(function ($project) {
            $this->info('Caching project report for project ' . $project->id);
            Cache::remember('project-report-' . $project->id, 60 * 60 * 4, function () use ($project) {
                return \App\Models\Project::query()
                    ->where('projects.id', $project->id)
                    ->with([
                        'goals' => function ($query) {
                            $query
                                ->with([
                                    'program' => function (\Illuminate\Database\Eloquent\Relations\BelongsTo $query) {
                                        $query->select('programs.id', 'program_name', /* other necessary fields */)
                                            //Sum the total appointments
                                            ->with(['forms' => function ($query) {
                                                $query->select('forms.id', 'program_id', /* other necessary fields */);
                                            }])
                                            ->with(['project' => function ($query) {
                                                $query->select('projects.id', /* other necessary fields */);
                                            }])
                                            ->withCount(['beneficiaries as total_beneficiaries' => function ($query) {
                                                $query->whereNotNull('approved_at');
                                            }])
                                            ->with(['beneficiaries' => function ($query) {
                                                $query
                                                    ->select('benefitiaries.id', 'name', 'consultations_count' /* other necessary fields */)
                                                    ->whereNotNull('approved_at')
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
            });
        });
    }
}

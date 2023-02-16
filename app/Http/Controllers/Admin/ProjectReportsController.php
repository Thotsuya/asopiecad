<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Traits\DynamicComparisons;

class ProjectReportsController extends Controller
{

    use DynamicComparisons;

    public function index(Project $project)
    {

        $goals = $project->goals()
            ->with('program.forms')
            ->with('program.beneficiaries')
            ->with('program.beneficiaries.forms')
            ->get();


        $results = $goals->map(function ($goal) {
            return [
                'id' => $goal->id,
                'goal_description' => $goal->goal_description,
                'goal_target' => $goal->goal_target,
                'program' => [
                    'id' => $goal->program->id,
                    'program_name' => $goal->program->program_name,
                    'beneficiaries_count' => $goal->program->beneficiaries->count(),
                    'completed_percentage' => round($goal->program->beneficiaries->count() / $goal->goal_target * 100, 2)
                    > 100 ? 100 : round($goal->program->beneficiaries->count() / $goal->goal_target * 100, 2),
                ],
                'conditions' => collect($goal->conditions)->map(function ($condition) use ($goal) {
                    return [
                        'label' => $condition['label'],
                        'value' => collect($goal->program->beneficiaries)->filter(function ($beneficiary) use ($condition) {

                            $meets_condition = false;

                            collect($beneficiary->forms)->each(function ($form) use ($condition, &$meets_condition) {
                                collect(json_decode($form->pivot->form_data))->each(function ($value, $key) use ($condition, &$meets_condition) {

                                    foreach ($condition['conditions'] as $cond) {;
                                        if ($key == $cond['field_slug']) {
                                            if ($this->is($value, $cond['operand'], $cond['field_value'])) {
                                                $meets_condition = true;
                                            } else {
                                                $meets_condition = false;
                                            }
                                        }
                                    }
                                });
                            });

                            return $meets_condition;
                        })->count(),
                    ];
                })->toArray(),
            ];
        })->toArray();

        return inertia('Reports/Show', [
            'project' => $project,
            'results' => $results,
        ]);
    }
}

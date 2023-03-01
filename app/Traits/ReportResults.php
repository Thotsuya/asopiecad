<?php

namespace App\Traits;


use App\Models\Benefitiary;
use Carbon\Carbon;

trait ReportResults
{


    public function getProjectResults($goals)
    {
        return $goals->map(function ($goal){
            return [
                'id'               => $goal->id,
                'goal_description' => $goal->goal_description,
                'goal_target'      => $goal->goal_target,
                'goal_target_year' => $goal->goal_target / $goal->program->project->project_duration,
                'program'          => [
                    'id'                   => $goal->program->id,
                    'program_name'         => $goal->program->program_name,
                    'beneficiaries_count'  => $goal->program->beneficiaries->count(),
                    'completed_percentage' => round(
                        $goal->program->beneficiaries->count() / $goal->goal_target * 100,
                        2
                    )
                    > 100 ? 100 : round($goal->program->beneficiaries->count() / $goal->goal_target * 100, 2),
                ],
                'conditions'       => collect($goal->conditions)->map(
                    function ($condition) use ($goal) {
                        return [
                            'label' => $condition['label'],
                            'value' => $goal->program->beneficiaries
                                ->filter(function (Benefitiary $beneficiary) use ($condition, $goal) {
                                    $meetsCondition = true;

                                    foreach ($condition['conditions'] as $condition) {
                                        $field = $beneficiary->answers->firstWhere(
                                            'pivot.field_id',
                                            $condition['field_id']
                                        );


                                        $meetsCondition = $this->is(
                                            $field->pivot->value,
                                            $condition['operand'],
                                            $condition['field_value']
                                        );

                                        if (!$meetsCondition) {
                                            return false;
                                        }
                                    }

                                    return $meetsCondition;
                                })->count(),

                        ];
                    }
                )->toArray(),
                'visits'           => // Count the total of appointments for each beneficiary
                    $goal->program->beneficiaries->map(function ($beneficiary) {
                        return $beneficiary->appointments->count();
                    })->sum(),
            ];
        });
    }

    public function getGlobalResults($project, $results){

        $res = $results->map(function ($result) {
            return $result['conditions'];
        })->flatten(1)->groupBy('label');

        return [
            'goal_description' => 'Al finalizar el proyecto se realizaran ' . $project->global_goal . ' tamizajes',
            'goal_target' => $project->global_goal,
            'total_beneficiaries' => $project->beneficiaries->count(),
            'completed_percentage' => round(
                $project->beneficiaries->count() / $project->global_goal * 100,
                2
            ),
            'total_visits'        => $project->beneficiaries->map(function ($beneficiary) {
                return $beneficiary->appointments->count();
            })->sum(),
            'conditions' => $res->map(function ($condition) {
                return [
                    'label' => $condition->first()['label'],
                    'value' => $condition->sum('value'),
                ];
            })->values()->toArray(),
            'current_progress' => $res->reduce(function ($carry, $condition) {
                return $carry + $condition->sum('value');
            }, 0),
        ];
    }

    public function getHeaders($results){
        return $results->map(function ($result) {
            return collect($result['conditions'])->mapWithKeys(function ($condition,$key) {
                return [$key => $condition['label']];
            });
        })->flatten()->unique()->values();
    }
}

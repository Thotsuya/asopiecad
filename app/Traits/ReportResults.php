<?php

namespace App\Traits;

trait ReportResults
{


    public function getProjectResults($goals)
    {
        return $goals->map(function ($goal) {
            return [
                'id'               => $goal->id,
                'goal_description' => $goal->goal_description,
                'goal_target'      => $goal->goal_target,
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
                                ->filter(function ($beneficiary) use ($condition, $goal) {
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
        return [
            'goal_description' => 'Al finalizar el proyecto se realizaran 7200 tamizajes',
            'goal_target' => 7200,
            'total_beneficiaries' => $project->beneficiaries->count(),
            'completed_percentage' => round(
                $project->beneficiaries->count() / 7200 * 100,
                2
            ),
            'total_visits'        => $project->beneficiaries->map(function ($beneficiary) {
                return $beneficiary->appointments->count();
            })->sum(),
            'conditions' => $results->map(function ($result) {
                return $result['conditions'];
            })->flatten(1)->groupBy('label')->map(function ($condition) {
                return [
                    'label' => $condition->first()['label'],
                    'value' => $condition->sum('value'),
                ];
            })->values()->toArray(),
        ];
    }

}

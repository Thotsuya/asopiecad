<?php

namespace App\Traits;


use App\Models\Benefitiary;
use App\Models\Project;
use App\Models\Screening;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Collection;

trait ReportResults
{


    public function getProjectResults(Collection $goals, Collection $meetings)
    {
        return $goals->map(function ($goal) {
            return [
                'id'               => $goal->id,
                'goal_description' => $goal->goal_description,
                'goal_target'      => $goal->goal_target,
                'is_grouped'       => $goal->group_every > 1,
                'group_every'      => $goal->group_every,
                'type'             => 'goal',
                'goal_target_year' => $goal->goal_target / $goal->program->project->project_duration,
                'order'            => $goal->program->order,
                'program'          => [
                    'id'                   => $goal->program->id,
                    'program_name'         => $goal->program->program_name,
                    'beneficiaries_count'  => $this->getGoalProgress($goal),
                    'total_ungrouped'      => $goal->program->beneficiaries->count(),
                    'total_grouped'        => $goal->group_every > 1 ? round(
                        $goal->program->beneficiaries->count() / $goal->group_every
                    ) : 0,
                    'completed_percentage' => round(
                        $goal->program->beneficiaries->count() / $goal->goal_target * 100,
                        2
                    )
                    > 100 ? 100 : round($goal->program->beneficiaries->count() / $goal->goal_target * 100, 2),
                    'pending'              => $goal->group_every > 1 ? round(
                        $goal->program->beneficiaries->count() % $goal->group_every
                    ) : $goal->goal_target - $goal->program->beneficiaries->count(),
                    'visits'               => $goal->program->beneficiaries->map(function ($beneficiary) {
                        return $beneficiary->appointments->count();
                    })->sum(),
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
                                            Str::startsWith($field->pivot->value, '["') && Str::endsWith(
                                                $field->pivot->value,
                                                '"]'
                                            ) ? json_decode($field->pivot->value) : $field->pivot->value,
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
            ];
        })->merge(
            $meetings->map(function ($meeting) {
                return [
                    'id'               => $meeting->id,
                    'goal_description' => $meeting->title,
                    'goal_target'      => $meeting->meeting_target,
                    'current_progress' => $meeting->count,
                    'completed_percentage' => round(
                        $meeting->count / $meeting->meeting_target * 100,
                        2
                    ),
                    'pending'          => max($meeting->meeting_target - $meeting->count, 0),
                    'type'             => 'meeting',
                    'order'            => $meeting->order
                ];
            })
        )->sortBy('order')->values();
    }

    public function getGlobalResults($project, $results)
    {
        $res = $results
            ->filter(function ($result) {
                return $result['type'] === 'goal';
            })
            ->map(function ($result) {
                return $result['conditions'];
            })
            ->flatten(1)
            ->groupBy('label');

        return [
            'goal_description'     => 'Meta Global del Proyecto: ' . $project->global_goal,
            'goal_target'          => $project->global_goal,
            'total_beneficiaries'  => $project->beneficiaries->count(),
            'completed_percentage' => round(
                $project->beneficiaries->count() / $project->global_goal * 100,
                2
            ),
            'total_visits'         => $project->beneficiaries->map(function ($beneficiary) {
                return $beneficiary->appointments->count();
            })->sum(),
            'conditions'           => $res->map(function ($condition) {
                return [
                    'label' => $condition->first()['label'],
                    'value' => $condition->sum('value'),
                ];
            })->values()->toArray(),
            'current_progress'     => $res->reduce(function ($carry, $condition) {
                return $carry + $condition->sum('value');
            }, 0),
        ];
    }

    public function getHeaders($results)
    {
        return $results
            ->filter(function ($result) {
                return $result['type'] === 'goal';
            })
            ->map(function ($result) {
                return collect($result['conditions'])->mapWithKeys(function ($condition, $key) {
                    return [$key => $condition['label']];
                });
            })
            ->flatten()
            ->unique()
            ->values();
    }

    public function getGoalProgress($goal)
    {
        // If the group every is greater than 1, then the goal is a group goal
        // For example, if the goal is 1000, and the group every is 100, for every 100 beneficiaries
        // the goal will be completed by 1
        return $goal->group_every > 1
            ? round($goal->program->beneficiaries->count() / $goal->goal_target * $goal->group_every)
            : $goal->program->beneficiaries->count();
    }

    public function getScreeningsReport()
    {
        $screenings = Screening::all();

        return [
            'title'                                 => '1.3  Detección precoz de 7.200 niños de 0 a 6 años.',
            'total_screenings'                      => $screenings->count(),
            'completed_percentage'                  => round(
                $screenings->count() / 7200 * 100,
                2
            ),
            'males_below_18_without_disabilities'   => $screenings->filter(function ($screening) {
                return floatval(
                        trim(str_replace('meses', '', $screening->age))
                    ) / 12 < 18 && $screening->gender == 'masculino';
            })->count(),
            'females_below_18_without_disabilities' => $screenings->filter(function ($screening) {
                return floatval(
                        trim(str_replace('meses', '', $screening->age))
                    ) / 12 < 18 && $screening->gender == 'femenino';
            })->count(),
            'males_over_18_without_disabilities'    => $screenings->filter(function ($screening) {
                return floatval(
                        trim(str_replace('meses', '', $screening->age))
                    ) / 12 > 18 && $screening->gender == 'masculino';
            })->count(),
            'females_over_18_without_disabilities'  => $screenings->filter(function ($screening) {
                return floatval(
                        trim(str_replace('meses', '', $screening->age))
                    ) / 12 > 18 && $screening->gender == 'femenino';
            })->count(),
        ];
    }
}

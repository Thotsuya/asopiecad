<?php

namespace App\Traits;


use App\Models\Benefitiary;
use App\Models\Project;
use App\Models\Screening;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\LazyCollection;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Collection;

trait ReportResults
{


    public function getProjectResults(LazyCollection $goals, LazyCollection $meetings, LazyCollection $inventory)
    {
        return $goals->map(function ($goal) use ($meetings, $inventory) {

            $conditionsTotal = collect($goal->conditions)
                ->map(
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

                                        if (!$field) {
                                            return false;
                                        }

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
                // Group the conditions by label and map them to a new collection with the label and the sum of the values
                )->groupBy('label')->map(function ($conditions, $label) {
                    return [
                        'label' => $label,
                        'value' => $conditions->sum('value'),
                    ];
                });


            return [
                'id' => $goal->id,
                'goal_description' => $goal->goal_description,
                'goal_target' => $goal->goal_target,
                'visible' => $goal->visible,
                'is_grouped' => $goal->group_every > 1,
                'group_every' => $goal->group_every,
                'type' => 'goal',
                'goal_target_year' => $goal->goal_target / $goal->program->project->project_duration,
                'order' => $goal->order ?? $goal->program->order,
                'active' => $goal->program->deleted_at === null,
                'goal_total' => $conditionsTotal->sum('value'),
                'program' => [
                    'id' => $goal->program->id,
                    'program_name' => $goal->program->program_name,
                    'beneficiaries_count' => $this->getGoalProgress($goal),
                    'total_ungrouped' => $goal->program->total_beneficiaries,
                    'total_grouped' => $goal->group_every > 1 ? round(
                        $goal->program->total_beneficiaries / $goal->group_every
                    ) : 0,
                    'completed_percentage' => min(round(
                        $goal->program->total_beneficiaries / $goal->goal_target * 100,
                        2
                    ), 100),
                    'pending' => $goal->group_every > 1 ? round(
                        $goal->program->total_beneficiaries % $goal->group_every
                    ) : $goal->goal_target - $goal->program->total_beneficiaries,
                    'visits' => $goal->program->beneficiaries->map(function ($beneficiary) {
                        return $beneficiary->appointments_count;
                    })->sum(),
                ],
                'conditions' => $conditionsTotal->values()->toArray(),

            ];
        })->merge(
            $meetings->flatMap(function ($meeting) {

                if ($meeting->conditions) {
                    return collect($meeting->conditions)->map(
                        function ($condition) use ($meeting) {

                            $total = $meeting->participants->filter(function ($participant) use ($condition) {
                                $meetsCondition = true;


                                // Find the first whose key is the $condition['field_slug'] and whose value is the $condition['field_value']

                                $field = collect($participant->form_data)->filter(
                                    function ($value, $key) use ($condition) {
                                        return $key === $condition['field_slug'];
                                    }
                                )->first();

                                if (!$field) {
                                    return false;
                                }

                                $meetsCondition = $this->is(
                                    Str::startsWith($field, '["') && Str::endsWith($field, '"]') ? json_decode(
                                        $field
                                    ) : $field,
                                    $condition['operand'],
                                    $condition['field_value']
                                );


                                if (!$meetsCondition) {
                                    return false;
                                }


                                return $meetsCondition;
                            })->count();

                            return [
                                'id' => $meeting->id,
                                'goal_description' => $condition['label'],
                                'visible' => 1,
                                'goal_target' => $condition['target'],
                                'current_progress' => $total,
                                'completed_percentage' => round(
                                    $total / $condition['target'] * 100,
                                    2
                                ),
                                'pending' => max($condition['target'] - $total, 0),
                                'type' => 'meeting',
                                'order' => $condition['order'],

                            ];
                        }
                    )->values()->toArray();
                } else {
                    return [[
                        'id' => $meeting->id,
                        'goal_description' => $meeting->title,
                        'visible' => 1,
                        'goal_target' => $meeting->meeting_target,
                        'current_progress' => $meeting->count,
                        'completed_percentage' => round(
                            $meeting->count / $meeting->meeting_target * 100,
                            2
                        ),
                        'pending' => max($meeting->meeting_target - $meeting->count, 0),
                        'type' => 'meeting',
                        'order' => $meeting->order
                    ]];
                }
            })
        )->merge(
            $inventory->map(function ($item) {
                return [
                    'id' => $item->uuid,
                    'goal_description' => $item->title,
                    'visible' => 1,
                    'goal_target' => $item->goal,
                    'current_progress' => $item->inventoryItems->count(),
                    'completed_percentage' => round(
                        $item->inventoryItems->count() / $item->goal * 100,
                        2
                    ),
                    'pending' => max($item->goal - $item->inventoryItems->count(), 0),
                    'type' => 'inventory',
                    'order' => $item->order,
                ];
            })
        )
            ->sortBy('order')->values();
    }

    public function getProjectResultsOptimizedForLowMemUsage(Project $project, LazyCollection $meetings, LazyCollection $inventory)
    {

        return $project->goals->map(function ($goal) use ($meetings, $inventory) {

            return [
                'id' => $goal->id,
                'goal_description' => $goal->goal_description,
                'goal_target' => $goal->goal_target,
                'visible' => $goal->visible,
                'is_grouped' => $goal->group_every > 1,
                'group_every' => $goal->group_every,
                'type' => 'goal',
                'goal_target_year' => $goal->goal_target / ($project->project_duration ?? 1),
                'completed_percentage' => min(round(
                    $goal->program->beneficiaries_count / $goal->goal_target * 100,
                    2
                ), 100),
                'order' => $goal->order ?? $goal->program->order,
                'active' => $goal->program->deleted_at === null,
                'goal_total' => $this->getGoalProgress($goal),
                'program' => [
                    'id' => $goal->program->id,
                    'program_name' => $goal->program->program_name,
                    'beneficiaries_count' => $this->getGoalProgress($goal),
                    'total_ungrouped' => $goal->program->beneficiaries_count,
                    'total_grouped' => $goal->group_every > 1 ? round(
                        $goal->program->beneficiaries_count / $goal->group_every
                    ) : 0,
                    'pending' => $goal->group_every > 1 ? round(
                        $goal->program->beneficiaries_count % $goal->group_every
                    ) : $goal->goal_target - $goal->program->beneficiaries_count,
                    'visits' => $goal->program->beneficiaries->sum('appointments_count'),
                ],
                'conditions' => collect($goal->conditions)->map(function ($condition) use ($goal) {
                    return [
                        'label' => $condition['label'],
                        'value' => $goal->program->beneficiaries->filter(function (Benefitiary $beneficiary) use ($condition, $goal) {

                            $meetsCondition = true;

                            foreach ($condition['conditions'] as $condition) {
                                $field = $beneficiary->answers->firstWhere(
                                    'pivot.field_id',
                                    $condition['field_id']
                                );

                                if (!$field) {
                                    return false;
                                }

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
                })->groupBy('label')->map(function ($conditions, $label) {
                    return [
                        'label' => $label,
                        'value' => $conditions->sum('value'),
                    ];
                })
            ];
        })->merge(
            $meetings->flatMap(function ($meeting) {

                if ($meeting->conditions) {
                    return collect($meeting->conditions)->map(
                        function ($condition) use ($meeting) {

                            $total = $meeting->participants->filter(function ($participant) use ($condition) {
                                $meetsCondition = true;


                                // Find the first whose key is the $condition['field_slug'] and whose value is the $condition['field_value']

                                $field = collect($participant->form_data)->filter(
                                    function ($value, $key) use ($condition) {
                                        return $key === $condition['field_slug'];
                                    }
                                )->first();

                                if (!$field) {
                                    return false;
                                }

                                $meetsCondition = $this->is(
                                    Str::startsWith($field, '["') && Str::endsWith($field, '"]') ? json_decode(
                                        $field
                                    ) : $field,
                                    $condition['operand'],
                                    $condition['field_value']
                                );

                                if (!$meetsCondition) {
                                    return false;
                                }


                                return $meetsCondition;
                            })->count();

                            return [
                                'id' => $meeting->id,
                                'goal_description' => $condition['label'],
                                'visible' => 1,
                                'goal_target' => $condition['target'],
                                'current_progress' => $total,
                                'completed_percentage' => round(
                                    $total / $condition['target'] * 100,
                                    2
                                ),
                                'pending' => max($condition['target'] - $total, 0),
                                'type' => 'meeting',
                                'order' => $condition['order'],

                            ];
                        }
                    )->values()->toArray();
                } else {
                    return [[
                        'id' => $meeting->id,
                        'goal_description' => $meeting->title,
                        'visible' => 1,
                        'goal_target' => $meeting->meeting_target,
                        'current_progress' => $meeting->count,
                        'completed_percentage' => round(
                            $meeting->count / $meeting->meeting_target * 100,
                            2
                        ),
                        'pending' => max($meeting->meeting_target - $meeting->count, 0),
                        'type' => 'meeting',
                        'order' => $meeting->order
                    ]];
                }
            })
        )->merge(
            $inventory->map(function ($item) {
                return [
                    'id' => $item->uuid,
                    'goal_description' => $item->title,
                    'visible' => 1,
                    'goal_target' => $item->goal,
                    'current_progress' => $item->inventoryItems->count(),
                    'completed_percentage' => round(
                        $item->inventoryItems->count() / $item->goal * 100,
                        2
                    ),
                    'pending' => max($item->goal - $item->inventoryItems->count(), 0),
                    'type' => 'inventory',
                    'order' => $item->order,
                ];
            })
        )
            ->sortBy('order')->values();

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
            'goal_description' => 'Meta Global del Proyecto: ' . $project->global_goal,
            'goal_target' => $project->global_goal,
            'total_beneficiaries' => $project->beneficiaries->count(),
            'completed_percentage' => round(
                $project->beneficiaries->count() / $project->global_goal * 100,
                2
            ),
            'total_visits' => $project->beneficiaries->map(function ($beneficiary) {
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

    public function getHeaders(\Illuminate\Support\Collection $results)
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
            ? round($goal->program->beneficiaries_count / $goal->goal_target * $goal->group_every)
            : $goal->program->beneficiaries_count;
    }

    public function getScreeningsReport($type = 'P-4211')
    {
        $screenings = Screening::where('type', $type)->get();

        return [
            'title' => $this->getScreeningLabel($type),
            'goal' => $type === 'P-4211' ? 7200 : 30000,
            'total_screenings' => $screenings->count(),
            'completed_percentage' => round(
                $screenings->count() / ($type === 'P-4211' ? 7200 : 30000) * 100,
                2
            ),
            'anual_goal' => 'N/A',
            'males_below_18_with_disabilities' => 0,
            'females_below_18_with_disabilities' => 0,
            'males_over_18_with_disabilities' => 0,
            'females_over_18_with_disabilities' => 0,

            'males_below_18_without_disabilities' => $screenings->filter(function ($screening) {
                return floatval(
                        trim(str_replace('meses', '', $screening->age))
                    ) / 12 < 18 && $screening->gender == 'masculino';
            })->count(),
            'females_below_18_without_disabilities' => $screenings->filter(function ($screening) {
                return floatval(
                        trim(str_replace('meses', '', $screening->age))
                    ) / 12 < 18 && $screening->gender == 'femenino';
            })->count(),
            'males_over_18_without_disabilities' => $screenings->filter(function ($screening) {
                return floatval(
                        trim(str_replace('meses', '', $screening->age))
                    ) / 12 > 18 && $screening->gender == 'masculino';
            })->count(),
            'females_over_18_without_disabilities' => $screenings->filter(function ($screening) {
                return floatval(
                        trim(str_replace('meses', '', $screening->age))
                    ) / 12 > 18 && $screening->gender == 'femenino';
            })->count(),
            'visits' => 'N/A',
            'total' => $screenings->count(),
            'pending' => 7200 - $screenings->count(),
        ];
    }

    private function getScreeningLabel($type)
    {
        return match ($type) {
            'P-4353' => 'R1.A6: Se realizará 30,000 tamizajes en salud ocular a nivel comunitario, durante la ejecución del proyecto en el area de cobertura del proyecto',
            'P-4211' => 'Realización de tamizaje de 7,200 niños y niñas de 0 a 06 años a través de visitas domiciliares en la comunidad, centros de desarrollo infantil y preescolares comunitarios a través de redes comunitarias',
            default => 'N/A'
        };
    }

    public function getHeadersForScreenings($type)
    {
        return match ($type) {
            'P-4211' =>
            [
                'Nombre de quien lo aplica' => 'registrant_name',
                'Departamento' => 'department',
                'Municipio' => 'municipality',
                'Fecha de Aplicación' => 'date_of_screening',
                'Nombre y Apellido' => 'name',
                'Edad' => 'age',
                'Sexo' => 'gender',
                'Comunicación' => [
                    'communication_level_1',
                    'communication_level_2',
                    'communication_level_3',
                    'communication_level_4',
                    'communication_level_5',
                    'communication_level_6'
                ],
                'Movimiento Amplio' => [
                    'wide_movements_level_1',
                    'wide_movements_level_2',
                    'wide_movements_level_3',
                    'wide_movements_level_4',
                    'wide_movements_level_5',
                    'wide_movements_level_6'
                ],
                'Movimientos Finos' => [
                    'fine_movements_level_1',
                    'fine_movements_level_2',
                    'fine_movements_level_3',
                    'fine_movements_level_4',
                    'fine_movements_level_5',
                    'fine_movements_level_6'
                ],
                'Resolución de Problemas' => [
                    'problem_solving_level_1',
                    'problem_solving_level_2',
                    'problem_solving_level_3',
                    'problem_solving_level_4',
                    'problem_solving_level_5',
                    'problem_solving_level_6'
                ],
                'Socio Individual' => [
                    'social_individual_level_1',
                    'social_individual_level_2',
                    'social_individual_level_3',
                    'social_individual_level_4',
                    'social_individual_level_5',
                    'social_individual_level_6'
                ],
            ],
            'P-4353' =>
            [
                'Nombre de quien lo aplica' => 'registrant_name',
                'Departamento' => 'department',
                'Municipio' => 'municipality',
                'Fecha de Aplicación' => 'date_of_screening',
                '1er Nombre' => 'first_name',
                '2do Nombre' => 'second_name',
                '1er Apellido' => 'first_surname',
                '2do Apellido' => 'second_surname',
                'Sexo' => 'gender',
                'Edad' => 'age',
                'Discapacidad Si / No' => 'disability_yes_no',
                'Tipo de discapacidad o alteración en el desarrollo' => 'disability_type',
                'Fecha de Nacimiento' => 'date_of_birth',
                'Cédula de Identidad' => 'document',
                'Dirección' => 'address',
                'Departamento del Tamizado' => 'screened_deparment',
                'Municipio del Tamizado' => 'screened_municipality',
                'Teléfono' => 'screened_phone_number',
                'Agudeza Visual' => 'screened_visual_acuity',
                'Referidos' => 'screened_refered',
                'Observaciones' => 'screened_observations',
                'Agudeza Visual Ojo Derecho' => 'screened_visual_acuity_right',
                'Agudeza Visual Ojo Izquierdo' => 'screened_visual_acuity_left',
            ]
        };
    }
}

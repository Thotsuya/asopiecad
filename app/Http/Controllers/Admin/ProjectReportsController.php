<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Traits\DynamicComparisons;
use Illuminate\Support\Str;

class ProjectReportsController extends Controller
{

    use DynamicComparisons;

    public function index(Project $project)
    {
        $goals = $project->goals()
            ->with('program.forms')
            ->with('program.beneficiaries')
            ->with('program.beneficiaries.forms')
            ->with('program.beneficiaries.answers.pivot.field')
            ->get();

        $results = $goals->map(function ($goal) {
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
                                    $meetsCondition = false;

                                    collect($condition['conditions'])->each(
                                        function ($condition) use ($beneficiary, &$meetsCondition) {
                                            $beneficiary->answers->each(
                                                function ($answer) use ($condition, &$meetsCondition) {
                                                    if ($condition['field_id'] == $answer->pivot->field_id) {
                                                        $meetsCondition = $this->is(
                                                            Str::startsWith($answer->pivot->value, '["') && Str::endsWith($answer->pivot->value, '"]')
                                                                ? json_decode($answer->pivot->value)
                                                                : $answer->pivot->value,
                                                            $condition['operand'],
                                                            $condition['field_value']
                                                        );
                                                    }
                                                }
                                            );
                                        }
                                    );

                                    return $meetsCondition;
                                })->count(),

                        ];
                    }
                )->toArray(),
            ];
        })->toArray();

        return inertia('Reports/Show', [
            'project' => $project,
            'results' => $results,
        ]);
    }

}

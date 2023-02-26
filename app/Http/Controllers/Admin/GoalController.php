<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\GoalRequest;
use App\Models\Goal;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use App\Traits\DynamicComparisons;

class GoalController extends Controller
{

    use DynamicComparisons;

    public function __construct()
    {
        $this->roles = Role::query()
            ->where('name', '!=', 'Super Admin')
            ->with('permissions')
            ->get();
    }

    public function store(Project $project,GoalRequest $request)
    {
        $project->goals()->create($request->validated());
        return redirect()->route('projects.show',$project);
    }

    public function show(Goal $goal){

        $goal->load('program.forms','program.beneficiaries','program.beneficiaries.forms','program.beneficiaries.answers.pivot.field');

        $result = [
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

                                foreach ($condition['conditions'] as $condition) {
                                    $field = $beneficiary->answers->firstWhere('pivot.field_id', $condition['field_id']);
                                    $meetsCondition = $this->is($field->pivot->value, $condition['operand'], $condition['field_value']);

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

        return inertia('Reports/Goals/Show', [
            'result' => $result,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Goal;
use App\Models\Project;

class ProjectReportsController extends Controller
{
    public function index(Project $project)
    {

        $goals = $project->goals()
            ->with('program.forms')
            // Load beneficiaries count
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

                    $field = $goal->program->forms->map(function ($form) use ($condition) {
                        return $form->getFormFieldsWithValues();
                    })->flatten(1)->where('id', $condition['field_id'])->first();

                    return [
                        'form_name' => $goal->program->forms->find($condition['form_id'])->form_name,
                        'form_count' => $goal->program->beneficiaries->filter(function ($beneficiary) use ($condition) {
                            return $beneficiary->forms->contains($condition['form_id']);
                        })->count(),
                        'field_name' => $goal->program->forms->map(function ($form) use ($condition) {
                            return $form->getFormFieldsWithKeys();
                        })->toArray()[0][$condition['field_id']],
                        'field_count' =>
                            $goal
                                ->program
                                ->beneficiaries
                                ->map(function ($beneficiary) use ($condition, $field) {
                                    //First, get the form that matches the condition's form_id
                                    return json_decode($beneficiary->forms->find($condition['form_id'])->pivot->form_data);
                                })->flatten(1)
                                ->map(function ($form) use ($condition, $field) {
                                    // Return the form whose key matches the field slug
                                    return $form->{$field['slug']};
                                })->flatten(1)
                                ->map(function ($item) use ($field) {
                                    if ($field['type'] == 'select' || $field['type'] == 'select multiple') {
                                        return collect($field['options'])->where('value', $item)->first()['name'];
                                    }
                                    return $item;
                                })
                                ->countBy()->toArray()
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

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GoalProgressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'goal_description' => ['required', 'string', 'max:255'],
            'goal_progress' => ['required', 'numeric', 'min:0'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, mixed>
     */

    public function messages(){
        return [
            'goal_description.required' => 'La descripción del avance es requerida',
            'goal_description.string' => 'La descripción del avance debe ser un texto',
            'goal_description.max' => 'La descripción del avance no debe ser mayor a 255 caracteres',
            'goal_progress.required' => 'El progreso es requerido',
            'goal_progress.numeric' => 'El progreso debe ser un número',
            'goal_progress.min' => 'El progreso debe ser mayor o igual a 0',
        ];
    }

    public function validated($key = null, $default = null)
    {
        return array_merge(parent::validated(), [
            'user_id' => auth()->id(),
        ]);
    }
}

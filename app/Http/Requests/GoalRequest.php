<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GoalRequest extends FormRequest
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
            'goal_target' => ['required', 'numeric', 'min:1'],
        ];
    }

    public function messages()
    {
        return [
            'goal_description.required' => 'La descripción del objetivo es requerida',
            'goal_target.required' => 'El objetivo es requerido',
            'goal_target.numeric' => 'El objetivo debe ser un número',
            'goal_target.min' => 'El objetivo debe ser mayor a 0',
        ];
    }

    public function validated($key = null, $default = null)
    {
        return array_merge(parent::validated(), [
            'user_id' => auth()->id(),
        ]);
    }
}

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
            'group_every' => ['nullable', 'numeric', 'min:0'],
            'program_id' => ['required', 'numeric', 'min:1', 'exists:programs,id'],
            'conditions' => ['sometimes', 'array'],
            'conditions.*.label' => ['sometimes', 'string', 'max:255'],
            'conditions.*.conditions.*.form_id' => ['sometimes', 'numeric', 'min:1', 'exists:forms,id'],
            'conditions.*.conditions.*.form_slug' => ['sometimes', 'string', 'max:255'],
            'conditions.*.conditions.*.field_id' => ['sometimes', 'numeric', 'min:1'],
            'conditions.*.conditions.*.field_slug' => ['sometimes', 'string', 'max:255'],
            'conditions.*.conditions.*.field_type' => ['sometimes', 'string', 'max:255'],
            'conditions.*.conditions.*.field_value' => ['sometimes'],
            'conditions.*.conditions.*.operand' => ['sometimes', 'string', 'max:255'],
        ];
    }

    public function messages()
    {
        return [
            'goal_description.required' => 'La descripción del objetivo es requerida',
            'goal_target.required' => 'El objetivo es requerido',
            'goal_target.numeric' => 'El objetivo debe ser un número',
            'goal_target.min' => 'El objetivo debe ser mayor a 0',
            'program_id.required' => 'El programa es requerido',
            'program_id.numeric' => 'El programa debe ser un número',
            'program_id.min' => 'El programa debe ser mayor a 0',
            'program_id.exists' => 'El programa no existe',
            'conditions.required' => 'Las condiciones son requeridas',
            'conditions.array' => 'Las condiciones deben ser un arreglo',
            'conditions.*.label.required' => 'La etiqueta de la condición es requerida',
            'conditions.*.label.string' => 'La etiqueta de la condición debe ser un texto',
            'conditions.*.label.max' => 'La etiqueta de la condición debe tener máximo 255 caracteres',
            'conditions.*.conditions.*.form_id.required' => 'El formulario es requerido',
            'conditions.*.conditions.*.form_id.numeric' => 'El formulario debe ser un número',
            'conditions.*.conditions.*.form_id.min' => 'El formulario debe ser mayor a 0',
            'conditions.*.conditions.*.form_id.exists' => 'El formulario no existe',
            'conditions.*.conditions.*.form_slug.required' => 'El formulario es requerido',
            'conditions.*.conditions.*.form_slug.string' => 'El formulario debe ser un texto',
            'conditions.*.conditions.*.form_slug.max' => 'El formulario debe tener máximo 255 caracteres',
            'conditions.*.conditions.*.field_id.required' => 'El campo es requerido',
            'conditions.*.conditions.*.field_id.numeric' => 'El campo debe ser un número',
            'conditions.*.conditions.*.field_id.min' => 'El campo debe ser mayor a 0',
            'conditions.*.conditions.*.field_slug.required' => 'El campo es requerido',
            'conditions.*.conditions.*.field_slug.string' => 'El campo debe ser un texto',
            'conditions.*.conditions.*.field_slug.max' => 'El campo debe tener máximo 255 caracteres',
            'conditions.*.conditions.*.field_type.required' => 'El tipo de campo es requerido',
            'conditions.*.conditions.*.field_type.string' => 'El tipo de campo debe ser un texto',
            'conditions.*.conditions.*.field_type.max' => 'El tipo de campo debe tener máximo 255 caracteres',
            'conditions.*.conditions.*.field_value.required' => 'El valor del campo es requerido',
            'conditions.*.conditions.*.operand.required' => 'El operador es requerido',
            'conditions.*.conditions.*.operand.string' => 'El operador debe ser un texto',
            'conditions.*.conditions.*.operand.max' => 'El operador debe tener máximo 255 caracteres',
        ];
    }
}

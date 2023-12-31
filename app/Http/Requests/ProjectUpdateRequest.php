<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectUpdateRequest extends FormRequest
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
            'project_name' => ['required', 'string', 'max:255'],
            'project_description' => ['sometimes', 'string', 'max:255'],
            'project_duration' => ['required', 'integer', 'min:1'],
            'global_goal' => ['required', 'integer', 'min:1'],
            'users' => ['sometimes', 'array'],
            'users.*.id' => ['exists:users,id'],
            'project_start_date' => ['required', 'date'],
            'project_featured_image' => ['nullable', 'image', 'max:4096'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */

    public function messages()
    {
        return [
            'project_name.required' => 'El nombre del proyecto es requerido',
            'project_name.string' => 'El nombre del proyecto debe ser una cadena de texto',
            'project_name.max' => 'El nombre del proyecto no debe exceder los 255 caracteres',
            'project_description.string' => 'La descripción del proyecto debe ser una cadena de texto',
            'project_description.max' => 'La descripción del proyecto no debe exceder los 255 caracteres',
            'users.array' => 'Los usuarios deben ser un arreglo',
            'users.*.exists' => 'El usuario no existe',
            'programs.array' => 'Los programas deben ser un arreglo',
            'programs.*.program_name.required' => 'El nombre del programa es requerido',
            'programs.*.program_name.string' => 'El nombre del programa debe ser una cadena de texto',
            'programs.*.program_name.max' => 'El nombre del programa no debe exceder los 255 caracteres',
            'programs.*.order.required' => 'El orden del programa es requerido',
            'programs.*.order.integer' => 'El orden del programa debe ser un número entero',
            'forms.array' => 'Los formularios deben ser un arreglo',
            'forms.*.exists' => 'El formulario no existe',
            'global_goal.numeric' => 'La meta global debe ser un número',
            'global_goal.min' => 'La meta global debe ser mayor o igual a 0',
            'global_goal.max' => 'La meta global debe ser menor o igual a 100',
            'project_duration.required' => 'La duración es requerida',
            'project_duration.integer' => 'La duración debe ser un número entero',
            'project_duration.min' => 'La duración debe ser mayor o igual a 1',
            'project_start_date.required' => 'La fecha de inicio es requerida',
            'project_start_date.date' => 'La fecha de inicio debe ser una fecha válida',
            'project_featured_image.image' => 'La imagen debe ser un archivo de imagen',
            'project_featured_image.max' => 'La imagen no debe pesar más de 4MB',
        ];
    }

    public function validated($key = null, $default = null)
    {
        return array_merge(parent::validated($key, $default), [
            'users' => collect($this->input('users', []))->pluck('id')->toArray(),
        ]);
    }
}

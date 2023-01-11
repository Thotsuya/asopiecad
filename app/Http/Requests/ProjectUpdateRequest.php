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
            'users' => ['sometimes', 'array'],
            'users.*.id' => ['exists:users,id'],
            'programs' => ['sometimes', 'array'],
            'programs.*.uuid' => ['sometimes'],
            'programs.*.program_name' => ['required', 'string', 'max:255'],
            'programs.*.order' => ['required', 'integer'],
            'forms' => ['sometimes', 'array'],
            'forms.*' => ['exists:forms,id'],
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
        ];
    }

    public function validated($key = null, $default = null)
    {
        return array_merge(parent::validated($key, $default), [
            'users' => collect($this->input('users', []))->mapWithKeys(function ($user) {
                return [$user['id'] => ['role_id' => $user['role_id']]];
            })->toArray(),
            'programs' => collect($this->programs)->map(function ($program) {
                return [
                    'uuid' => array_key_exists('uuid', $program) ? $program['uuid'] : null,
                    'project_id' => $this->route('project')->id,
                    'program_name' => $program['program_name'],
                    'order' => $program['order'],
                ];
            })->toArray(),
        ]);
    }
}

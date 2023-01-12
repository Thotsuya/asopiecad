<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'permissions' => ['sometimes', 'array'],
            'permissions.*' => ['exists:permissions,id'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */

    public function messages(){
        return [
            'name.required' => 'El nombre del rol es requerido',
            'name.string' => 'El nombre del rol debe ser una cadena de texto',
            'name.max' => 'El nombre del rol no debe exceder los 255 caracteres',
            'permissions.array' => 'Los permisos deben ser un arreglo',
            'permissions.*.exists' => 'El permiso no existe',
        ];
    }
}

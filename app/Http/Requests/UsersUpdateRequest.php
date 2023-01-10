<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UsersUpdateRequest extends FormRequest
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
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $this->user->id],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'El campo nombre es obligatorio',
            'name.string' => 'El campo nombre debe ser una cadena de texto',
            'name.max' => 'El campo nombre no debe ser mayor a 255 caracteres',
            'email.required' => 'El campo email es obligatorio',
            'email.string' => 'El campo email debe ser una cadena de texto',
            'email.email' => 'El campo email debe ser un email válido',
            'email.max' => 'El campo email no debe ser mayor a 255 caracteres',
            'email.unique' => 'El campo email debe ser único',
            'password.min' => 'El campo password debe ser mínimo de 8 caracteres',
            'password.confirmed' => 'El campo password debe ser igual al campo password confirmation',
        ];
    }

}

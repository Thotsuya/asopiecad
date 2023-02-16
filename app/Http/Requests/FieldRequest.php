<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FieldRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('Crear Formularios') || auth()->user()->can('Editar Formularios');
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
            'type' => ['required', 'string', 'max:255'],
            'required' => ['required', 'boolean'],
            'options' => ['nullable', 'array'],
            'size' => ['required','string','max:255'],
            'tab_id' => ['required','integer','exists:tabs,id'],
        ];
    }
}

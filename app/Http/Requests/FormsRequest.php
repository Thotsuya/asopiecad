<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check(); //TODO: Add role based authorization
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'form_name' => ['required', 'string', 'max:255'],
            'tabs' => ['required', 'array'],
            'fields' => ['required', 'array'],
        ];
    }
}

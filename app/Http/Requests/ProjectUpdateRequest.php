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
            'form_id' => ['required', 'exists:forms,id'],
            'project_name' => ['required', 'string', 'max:255'],
            'project_description' => ['sometimes', 'string', 'max:255'],
            'users' => ['sometimes', 'array'],
            'users.*' => ['exists:users,id'],
            'programs' => ['sometimes', 'array'],
            'programs.*.program_name' => ['required', 'string', 'max:255'],
        ];
    }
}

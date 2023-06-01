<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MeetingRequest extends FormRequest
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
            'title' => ['required', 'string'],
            'project_id' => ['required', 'integer', 'exists:projects,id'],
            'participants' => ['required', 'array'],
            'participants.*.name' => ['required', 'string'],
            'participants.*.document' => ['nullable', 'string'],
            'participants.*.date' => ['required', 'date'],
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array<string, mixed>
     */

    public function messages(){
        return [
            'title.required' => 'El título es requerido',
            'project_id.required' => 'El proyecto es requerido',
            'project_id.exists' => 'El proyecto no existe',
            'participants.required' => 'Los participantes son requeridos',
            'participants.*.name.required' => 'El nombre del participante es requerido',
            'participants.*.document.string' => 'El documento del participante debe ser un texto',
            'participants.*.date.required' => 'La fecha del participante es requerida',
        ];
    }
}

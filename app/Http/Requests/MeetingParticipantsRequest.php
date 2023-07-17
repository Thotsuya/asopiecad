<?php

namespace App\Http\Requests;

use App\Models\Form;
use App\Models\Program;
use Illuminate\Foundation\Http\FormRequest;

class MeetingParticipantsRequest extends FormRequest
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
        $form = Form::find($this->form_id);
        return array_merge($form->getFormValidationRules(), [
            'meeting_id' => ['required','exists:meetings,id'],
            'form_id' => ['required','exists:forms,id'],
            'add_one_meeting' => ['required','boolean'],
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */

    public function messages() {
        $form = Form::find($this->form_id);

        return array_merge($form->getFormValidationMessages(), [
            'meeting_id.required' => 'La reunión es requerida',
            'meeting_id.exists' => 'La reunión no existe',
            'form_id.required' => 'El formulario es requerido',
            'form_id.exists' => 'El formulario no existe',
            'add_one_meeting.required' => 'El campo add_one_meeting es requerido',
            'add_one_meeting.boolean' => 'El campo add_one_meeting debe ser booleano',
        ]);
    }
}

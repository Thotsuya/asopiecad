<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AppointmentRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'benefitiary_id' => ['required', 'exists:benefitiaries,id'],
            'project_id' => ['required', 'exists:projects,id'],
            'end_date' => ['required', 'date'],
            'comments' => ['nullable','array']
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'end_date' => $this->start_date,
        ]);
    }

    public function messages()
    {
        return [
            'title.required' => 'La descripcion de la cita es requerida',
            'title.string' => 'La descripcion de la cita debe ser un texto',
            'title.max' => 'La descripcion de la cita no debe ser mayor a 255 caracteres',
            'start_date.required' => 'La fecha de la cita es requerida',
            'start_date.date' => 'La fecha de la cita debe ser una fecha valida',
            'beneficiary_id.required' => 'El beneficiario es requerido',
            'beneficiary_id.exists' => 'El beneficiario no existe',
            'project_id.required' => 'El proyecto es requerido',
            'project_id.exists' => 'El proyecto no existe',
            'end_date.required' => 'La fecha de la cita es requerida',
            'end_date.date' => 'La fecha de la cita debe ser una fecha valida',
            'comments.array' => 'Los comentarios deben ser un arreglo',
        ];
    }
}

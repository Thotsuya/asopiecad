<?php

namespace App\Http\Requests;

use App\Rules\BenefitiaryExistsInProject;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BeneficiaryRequest extends FormRequest
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
            'beneficiary_id' => [Rule::requiredIf($this->is_new_beneficiary === 'false'),
                new BenefitiaryExistsInProject($this->beneficiary_id, $this->project_id, $this->is_new_beneficiary === 'true', $this->data_only === 'true')],
            'is_new_beneficiary' => ['required'],
            'beneficiary_name' => [Rule::requiredIf($this->is_new_beneficiary === 'true')],
            'project_id' => [Rule::requiredIf(!$this->data_only == 'true')],
            'data_only' => ['required'],
            'forms' => ['required_if:data_only,true', 'array'],
            'forms.*' => ['required_if:data_only,true', 'exists:forms,id'],
        ];
    }

    public function messages()
    {
        return [
            'beneficiary_id.required_if' => 'El beneficiario es requerido',
            'beneficiary_id.exists' => 'El beneficiario no existe',
            'beneficiary_id.required' => 'El beneficiario es requerido',
            'is_new_beneficiary.required' => 'El campo es requerido',
            'is_new_beneficiary.boolean' => 'El campo debe ser booleano',
            'beneficiary_name.required_if' => 'El nombre del beneficiario es requerido',
            'beneficiary_name.required' => 'El nombre del beneficiario es requerido',
            'beneficiary_name.string' => 'El nombre del beneficiario debe ser una cadena de texto',
            'beneficiary_name.max' => 'El nombre del beneficiario debe tener máximo 255 caracteres',
            'project_id.required_if' => 'El proyecto es requerido',
            'project_id.exists' => 'El proyecto no existe',
            'data_only.required' => 'El campo es requerido',
            'data_only.boolean' => 'El campo debe ser booleano',
            'forms.required_if' => 'El formulario es requerido',
            'forms.array' => 'El formulario debe ser un arreglo',
            'forms.*.required_if' => 'El formulario es requerido',
            'forms.*.exists' => 'El formulario no existe',
        ];
    }
}

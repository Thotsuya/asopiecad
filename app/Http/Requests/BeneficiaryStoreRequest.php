<?php

namespace App\Http\Requests;

use App\Models\Form;
use App\Models\Program;
use Illuminate\Foundation\Http\FormRequest;

class BeneficiaryStoreRequest extends FormRequest
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
        $programs = Program::find($this->programs);

        $forms = $programs->map(function ($program) {
            return $program->forms;
        })->flatten()->unique('id');


        $merged_rules = $forms
            ->map(function (Form $form) {
                return $form->getFormValidationRules();
            })->collapse()
            ->merge([
                'name' => ['required', 'string', 'max:255'],
                'programs' => ['sometimes', 'array'],
                'programs.*' => ['exists:programs,id'],
            ])->toArray();


        return $merged_rules;
    }

    public function messages()
    {
        $programs = Program::find($this->programs);

        $forms = $programs->map(function ($program) {
            return $program->forms;
        })->flatten()->unique('id');

        $merged_messages = $forms
            ->map(function (Form $form) {
                return $form->getFormValidationMessages();
            })->collapse()
            ->merge([
                'name.required' => 'El nombre del beneficiario es requerido',
                'name.string' => 'El nombre del beneficiario debe ser un texto',
                'name.max' => 'El nombre del beneficiario debe tener como máximo 255 caracteres',
                'programs.array' => 'Los programas deben ser un arreglo',
                'programs.*.exists' => 'El programa no existe',
            ])->toArray();

        return $merged_messages;
    }
}

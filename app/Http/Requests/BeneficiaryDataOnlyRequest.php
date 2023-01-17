<?php

namespace App\Http\Requests;

use App\Models\Form;
use Illuminate\Foundation\Http\FormRequest;

class BeneficiaryDataOnlyRequest extends FormRequest
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

        $forms = Form::whereIn('id', collect($this->forms)->pluck('id')->toArray())->get();

        return collect($forms)
            ->map(function (Form $form) {
                return $form->getFormValidationRules();
            })->collapse()
            ->merge([
                'name' => ['required', 'string', 'max:255'],
            ])->toArray();
    }

    public function messages()
    {
        $forms = Form::whereIn('id', collect($this->forms)->pluck('id')->toArray())->get();

        return collect($forms)
            ->map(function (Form $form) {
                return $form->getFormValidationMessages();
            })->collapse()
            ->merge([
                'name.required' => 'El nombre del beneficiario es requerido',
                'name.string' => 'El nombre del beneficiario debe ser un texto',
                'name.max' => 'El nombre del beneficiario debe tener como máximo 255 caracteres',
            ])->toArray();
    }
}

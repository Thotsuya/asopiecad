<?php

namespace App\Http\Requests;

use App\Models\Form;
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
        $project = $this->route('project');
        $forms = $project->forms()->get();

        $merged_rules = collect($forms)->map(function(Form $form){
            return $form->getFormValidationRules();
        })->collapse()->toArray();


        return $merged_rules;
    }

    public function messages()
    {
        $project = $this->route('project');
        $forms = $project->forms()->get();

        $merged_messages = collect($forms)->map(function(Form $form){
            return $form->getFormValidationMessages();
        })->collapse()->toArray();

        return $merged_messages;
    }
}

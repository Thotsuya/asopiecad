<?php

namespace App\Http\Requests;

use App\Models\Form;
use Illuminate\Foundation\Http\FormRequest;

class InventoryItemRequest extends FormRequest
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
            'title'   => 'required',
            'form_id' => ['required', 'exists:forms,id'],
            'inventory_id' => ['required', 'exists:inventories,id'],
        ]);
    }

    public function messages() {
        $form = Form::find($this->form_id);

        return array_merge($form->getFormValidationMessages(), [
            'form_id.required' => 'El formulario es requerido',
            'form_id.exists' => 'El formulario no existe',
            'inventory_id.required' => 'El inventario es requerido',
            'inventory_id.exists' => 'El inventario no existe',
            'title.required' => 'El título es requerido',
        ]);
    }
}

<?php
namespace App\Traits;

use App\Rules\ValidateDocumentRule;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

trait HasValidationRulesAndMessages {

    public function getFormValidationRules()
    {
        $rules = [];

            collect($this->fields)->each(function ($field) use (&$rules) {

                $rule = [];

                if ($field['required']) {
                    $rule[] = ['required'];
                }else{
                    $rule[] = ['nullable'];
                }

                match ($field['type']) {
                    'email' => $rule[] = ['email'],
                    'number' => $rule[] = ['numeric'],
                    'date' => $rule[] = ['date'],
                    'file' => $rule[] = ['file'],
                    'image' => $rule[] = ['image'],
                    'text' => $rule[] = ['string', 'max:255'],
                    'select multiple' => $rule[] = ['array'],
                    default => $rule[] = ['string'],
                };

                // If th field slug contains the word cedula, then we need to validate it as a cedula
                // with the format XXX-XXXXXX-XXXXX where X is a number or letter
                if (Str::contains(strtolower($field['slug']), ['cedula'])) {
                    //XXX-XXXXXX-XXXXX where X is a number or letter
                    $rule[] = 'regex:/^[0-9,A-Z,a-z]{3}-[0-9,A-Z,a-z]{6}-[0-9,A-Z,a-z]{5}$/';
                }

                $rules[$field['slug'] . '-' . $this->form_slug . '-' . $this->id] = $rule;
            });

        return $rules;
    }

    public function getFormValidationMessages()
    {
        $messages = [];
            collect($this->fields)->each(function ($field) use (&$messages) {
                if ($field['required']) {
                    $messages[$field['slug'] . '-' . $this->form_slug . '-' . $this->id . '.required'] = 'El campo ' . $field['name'] . ' es requerido';
                }

                match ($field['type']) {
                    'email' => $messages[$field['slug'] . '-' . $this->form_slug . '-' . $this->id . '.email'] = 'El campo ' . $field['name'] . ' debe ser un correo electrónico válido',
                    'number' => $messages[$field['slug'] . '-' . $this->form_slug . '-' . $this->id . '.numeric'] = 'El campo ' . $field['name'] . ' debe ser un número',
                    'date' => $messages[$field['slug'] . '-' . $this->form_slug . '-' . $this->id . '.date'] = 'El campo ' . $field['name'] . ' debe ser una fecha válida',
                    'file' => $messages[$field['slug'] . '-' . $this->form_slug . '-' . $this->id . '.file'] = 'El campo ' . $field['name'] . ' debe ser un archivo válido',
                    'image' => $messages[$field['slug'] . '-' . $this->form_slug . '-' . $this->id . '.image'] = 'El campo ' . $field['name'] . ' debe ser una imagen válida',
                    'select multiple' => $messages[$field['slug'] . '-' . $this->form_slug . '-' . $this->id . '.array'] = 'El campo ' . $field['name'] . ' debe ser un arreglo',
                    default => $messages[$field['slug'] . '-' . $this->form_slug . '-' . $this->id . '.string'] = 'El campo ' . $field['name'] . ' debe ser un texto válido',
                };

                if (Str::contains(strtolower($field['slug']), ['cedula'])) {
                    $messages[$field['slug'] . '-' . $this->form_slug . '-' . $this->id . '.regex'] = 'El campo ' . $field['name'] . ' debe ser una cédula válida';
                }

            });

        return $messages;
    }

    public function getFormFields(){
        $fields = [];

        collect($this->form_fields)->each(function ($tab) use (&$fields) {
            collect($tab['fields'])->each(function ($field) use (&$fields) {
                $fields[] = $field['slug'] . '-' . $this->form_slug . '-' . $this->id;
            });
        });

        return $fields;
    }

    public function getFormFieldsWithKeys(){
        $fields = [];

        collect($this->form_fields)->each(function ($tab) use (&$fields) {
            collect($tab['fields'])->each(function ($field) use (&$fields) {
                $fields[$field['id']] = $field['name'];
            });
        });

        return $fields;
    }

    public function getFormFieldsWithValues(){
        $fields = [];

        collect($this->form_fields)->each(function ($tab) use (&$fields) {
            collect($tab['fields'])->each(function ($field) use (&$fields) {
                $fields[] = [
                    'id' => $field['id'],
                    'name' => $field['name'],
                    'slug' => $field['slug'] . '-' . $this->form_slug . '-' . $this->id,
                    'type' => $field['type'],
                    'options' => $field['options'],
                ];
            });
        });

        return $fields;
    }
}

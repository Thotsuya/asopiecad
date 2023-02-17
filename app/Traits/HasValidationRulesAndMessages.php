<?php
namespace App\Traits;

trait HasValidationRulesAndMessages {

    public function getFormValidationRules()
    {
        $rules = [];

            collect($this->fields)->each(function ($field) use (&$rules) {

                $rule = [];

                if ($field['required']) {
                    $rule[] = 'required';
                } else {
                    $rule[] = 'nullable';
                }

                if ($field['type'] == 'email') {
                    $rule[] = 'email';
                }

                if ($field['type'] == 'number') {
                    $rule[] = 'numeric';
                }

                if ($field['type'] == 'date') {
                    $rule[] = 'date';
                }

                if ($field['type'] == 'file') {
                    $rule[] = 'file';
                }

                if ($field['type'] == 'image') {
                    $rule[] = 'image';
                }

                if ($field['type'] == 'text') {
                    $rule[] = 'string';
                    $rule[] = 'max:255';
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

                if ($field['type'] == 'email') {
                    $messages[$field['slug'] . '-' . $this->form_slug . '-' . $this->id . '.email'] = 'El campo ' . $field['name'] . ' debe ser un correo electrónico válido';
                }

                if ($field['type'] == 'number') {
                    $messages[$field['slug'] . '-' . $this->form_slug . '-' . $this->id . '.numeric'] = 'El campo ' . $field['name'] . ' debe ser un número';
                }

                if ($field['type'] == 'date') {
                    $messages[$field['slug'] . '-' . $this->form_slug . '-' . $this->id . '.date'] = 'El campo ' . $field['name'] . ' debe ser una fecha válida';
                }

                if ($field['type'] == 'file') {
                    $messages[$field['slug'] . '-' . $this->form_slug . '-' . $this->id . '.file'] = 'El campo ' . $field['name'] . ' debe ser un archivo válido';
                }

                if ($field['type'] == 'image') {
                    $messages[$field['slug'] . '-' . $this->form_slug . '-' . $this->id . '.image'] = 'El campo ' . $field['name'] . ' debe ser una imagen válida';
                }

                if ($field['type'] == 'text') {
                    $messages[$field['slug'] . '-' . $this->form_slug . '-' . $this->id . '.string'] = 'El campo ' . $field['name'] . ' debe ser un texto válido';
                    $messages[$field['slug'] . '-' . $this->form_slug . '-' . $this->id . '.max'] = 'El campo ' . $field['name'] . ' debe tener un máximo de 255 caracteres';
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

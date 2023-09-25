<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BeneficiaryFormsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'form_name' => $this->form_name,
            'form_slug' => $this->form_slug,
            'tabs' => $this->tabs->map(function($tab){
                return [
                    'id' => $tab->id,
                    'name' => $tab->tab_name,
                    'slug' => $tab->tab_slug,
                    'fields' => $tab->fields->map(function($field){
                        return [
                            'id' => $field->id,
                            'name' => $field->name,
                            'slug' => $field->slug,
                            'type' => $field->type,
                            'options' => $field->options,
                            'size' => $field->size,
                            'required' => (bool)$field->required,
                            'tab_id' => $field->tab_id,
                        ];
                    })->toArray()
                ];
            })->toArray(),
            'fields' => $this->whenLoaded('fields', function () {
                return $this->fields;
            }),
        ];

    }
}

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
            'tabs' => collect($this->form_fields)->map(function ($tab) {
                return [
                    'id' => $tab['tab_id'],
                    'name' => $tab['tab_name'],
                    'slug' => $tab['tab_slug'],
                    'editMode' => false,
                    'order' => $tab['order'],
                    'fields' => collect($tab['fields'])->map(function ($field) {
                        return [
                            'id' => $field['id'],
                            'name' => $field['name'],
                            'type' => $field['type'],
                            'required' => $field['required'],
                            'size' => $field['size'],
                            'tab_id' => $field['tab_id'],
                            'options' => $field['options'],
                            'slug' => $field['slug']
                        ];
                    })->toArray()
                ];
            })->toArray(),
        ];

    }
}

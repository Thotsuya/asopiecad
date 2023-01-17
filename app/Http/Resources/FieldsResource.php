<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FieldsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'form_id' => $this->id,
            'form_name' => $this->form_name,
            'fields' => collect($this->form_fields)->map(function ($tab) {
                return collect($tab['fields'])->map(function ($field) {
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
                })->toArray();
            })->flatten(1)->toArray()
        ];
    }
}

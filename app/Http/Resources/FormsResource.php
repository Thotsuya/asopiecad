<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FormsResource extends JsonResource
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
            'form_name' => $this->form_name,
            'tabs' => collect($this->form_fields)->map(function ($tab) {
                return [
                    'tab_id' => $tab['tab_id'],
                    'tab_name' => $tab['tab_name']
                ];
            })->toArray(),
            'fields' => collect($this->form_fields)->map(function ($tab) {
                return collect($tab['fields'])->map(function ($field) {
                    return [
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

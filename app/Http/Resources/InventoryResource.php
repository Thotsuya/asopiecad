<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InventoryResource extends JsonResource
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
            'id'=> $this->id,
            'uuid'=> $this->uuid,
            'title' => $this->title,
            'form_id' => $this->form_id,
            'form' => $this->whenLoaded('form', function () {
                return BeneficiaryFormsResource::make($this->form);
            }),
            'headers' => $this->whenLoaded('form', function () {
                return $this->form->fields->pluck('name', 'id')->toArray();
            }),
            'inventory_items' => $this->whenLoaded('inventoryItems')
        ];
    }
}

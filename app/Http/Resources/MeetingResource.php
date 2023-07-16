<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MeetingResource extends JsonResource
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
            'total_meetings' => $this->count,
            'form_id' => $this->form_id,
            'form' => $this->whenLoaded('form', function () {
                    return BeneficiaryFormsResource::make($this->form);
            }),
        ];
    }
}

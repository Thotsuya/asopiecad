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
            'headers' => $this->whenLoaded('form', function () {
                return $this->form->fields->pluck('name', 'id')->toArray();
            }),
            'participants' => $this->whenLoaded('participants', function () {
                    return MeetingParticipantsResource::collection($this->participants);
            }),
            'conditions' => $this->conditions,
        ];
    }
}

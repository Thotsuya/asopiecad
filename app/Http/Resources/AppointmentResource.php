<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class AppointmentResource extends JsonResource
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
            'title' => $this->title,
            'date' => Carbon::parse($this->start_date)->format('Y-m-d H:i:s'),
            'textColor' => '#ffffff',
            'backgroundColor' => '#ffffff',
            'user' => $this->whenLoaded('user', function () {
                return [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                ];
            }),
            'beneficiary' => $this->whenLoaded('beneficiary', function () {
                return [
                    'id' => $this->beneficiary->id,
                    'name' => $this->beneficiary->name,
                ];
            }),
        ];
    }
}

<?php

namespace App\Http\Resources;

use App\Models\Screening;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class ScreeningResource extends JsonResource
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
            'uuid' => $this->uuid,
            'name' => $this->name,
            'registrant_name' => $this->registrant_name,
            'age' => $this->age,
            'gender' => Screening::GENDERS[$this->gender],
            'date_of_screening' => Carbon::parse($this->date_of_screening)->translatedFormat('d F Y'),
            'screened_by' => $this->user?->name ?? 'N/A',
            'type' => $this->type
        ];
    }
}

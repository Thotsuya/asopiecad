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
            'age' => $this->age,
            'gender' => Screening::GENDERS[$this->gender],
            'date_of_screening' => Carbon::parse($this->date_of_screening)->translatedFormat('d F Y'),
            'screened_by' => $this->user->name,
            'communication' => $this->communication_level_1 + $this->communication_level_2 + $this->communication_level_3 + $this->communication_level_4 + $this->communication_level_5 + $this->communication_level_6,
            'wide_movements' => $this->wide_movements_level_1 + $this->wide_movements_level_2 + $this->wide_movements_level_3 + $this->wide_movements_level_4 + $this->wide_movements_level_5 + $this->wide_movements_level_6,
            'fine_movements' => $this->fine_movements_level_1 + $this->fine_movements_level_2 + $this->fine_movements_level_3 + $this->fine_movements_level_4 + $this->fine_movements_level_5 + $this->fine_movements_level_6,
            'problem_solving' => $this->problem_solving_level_1 + $this->problem_solving_level_2 + $this->problem_solving_level_3 + $this->problem_solving_level_4 + $this->problem_solving_level_5 + $this->problem_solving_level_6,
            'social_individual' => $this->social_individual_level_1 + $this->social_individual_level_2 + $this->social_individual_level_3 + $this->social_individual_level_4 + $this->social_individual_level_5 + $this->social_individual_level_6,
        ];
    }
}

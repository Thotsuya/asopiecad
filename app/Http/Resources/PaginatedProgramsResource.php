<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PaginatedProgramsResource extends JsonResource
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
            'id'   => $this->id,
            'uuid' => $this->uuid,
            'program_name' => $this->program_name,
            'order' => $this->order,
            'edit_mode' => false,
            'beneficiaries_count' => $this->whenCounted('beneficiaries'),
            'beneficiaries' => $this->whenLoaded('beneficiaries', function () {
                return $this->beneficiaries->map(function ($beneficiary) {
                    return [
                        'id' => $beneficiary->id,
                        'uuid' => $beneficiary->uuid,
                        'name' => $beneficiary->name,
                        'created_at' => $beneficiary->pivot->created_at->translatedFormat('d/m/Y H:i A'),
                    ];
                });
            }),
        ];
    }
}

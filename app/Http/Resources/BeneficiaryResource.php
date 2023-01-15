<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BeneficiaryResource extends JsonResource
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
            'id' => $this->id,
            'uuid' => $this->uuid,
            'internal_id' => $this->internal_id,
            'name' => $this->name,
            'internal_status' => $this->internal_status,
            'approved_at' => $this->approved_at,
            'deletion_reason' => $this->deletion_reason,
            'beneficiary_data' => $this->beneficiary_data,
            'badge' => match ($this->internal_status) {
                'Pendiente' => 'warning',
                'Aprobado' => 'success',
                'Rechazado', 'Eliminado' => 'danger',
                default => 'secondary',
            },
            'last_visited_at' => $this->whenLoaded('appointments', function () {
                return $this->appointments->sortByDesc('start_date')->first()
                    ? $this->appointments->sortByDesc('start_date')->first()->start_date->translatedFormat('d/m/Y H:i A')
                    : null;
            }),
            'programs' => $this->programs,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

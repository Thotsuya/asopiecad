<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

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
            'beneficiary_data' => $this->whenLoaded('answers',function(){
                return $this->answers->map(function($answer){
                    return [$answer->pivot->field->getFieldFormattedSlug() =>
                        // If the answer is an array, then decode it, otherwise return the value, arrays starts with [" and ends with "], or
                        (Str::startsWith($answer->pivot->value, '["') && Str::endsWith($answer->pivot->value, '"]'))
                        || $answer->pivot->value === '[]'

                            ? json_decode($answer->pivot->value)
                            : $answer->pivot->value
                    ];
                })->collapse()->toArray();
            }),
            'badge' => $this->deleted_at ? 'danger' : match ($this->internal_status) {
                'Pendiente de aprobación' => 'warning',
                'Aprobado' => 'success',
                'Rechazado', 'Eliminado' => 'danger',
                default => 'secondary',
            },
            'last_visited_at' => $this->whenLoaded('appointments', function () {
                return $this->appointments->sortByDesc('start_date')->first()
                    ? $this->appointments->sortByDesc('start_date')->first()->start_date->translatedFormat('d/m/Y H:i A')
                    : null;
            }),
            'programs' => $this->whenLoaded('programs',function (){
                return $this->programs->map(function ($program){
                    return [
                        'id' => $program->id,
                        'uuid' => $program->uuid,
                        'program_name' => $program->program_name,
                    ];
                });
            }),
            'projects' => $this->whenLoaded('projects'),
            'projects_count' => $this->whenCounted('projects'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'is_trashed' => $this->trashed(),
            'is_approved' => (bool)$this->approved_at,
            'created_by' => $this->whenLoaded('creator'),
            'last_consultation' => $this->last_consultation,
            'consultations_count' => $this->consultations_count,
        ];
    }


}

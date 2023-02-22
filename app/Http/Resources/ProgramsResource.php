<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProgramsResource extends JsonResource
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
            'program_name' => $this->program_name,
            'forms' => $this->whenLoaded('forms', function () {
                // return a FormResource collection
                return FormsResource::collection($this->forms);
            }),
            'beneficiaries' => $this->whenLoaded('beneficiaries', function () {
                return $this->beneficiaries->map(function ($beneficiary) {
                    return [
                        'id'          => $beneficiary->id,
                        'uuid'        => $beneficiary->uuid,
                        'internal_id' => $beneficiary->internal_id,
                        'name'        => $beneficiary->name,
                        'created_at'  => $beneficiary->pivot->created_at,
                    ];
                });
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectEditResource extends JsonResource
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
            'project_name' => $this->project_name,
            'project_description' => $this->project_description,
            'global_goal' => $this->global_goal,
            'users' => $this->users,
            'programs' => $this->whenLoaded('programs', function () {
                return collect($this->programs)->map(function ($program) {
                    return [
                        'id' => $program->id,
                        'uuid' => $program->uuid,
                        'program_name' => $program->program_name,
                        'order' => $program->order,
                        'edit_mode' => false,
                        'forms' => collect($program->forms)->pluck('id')->toArray(),
                    ];
                });
            }),
        ];
    }
}

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
            'project_duration' => $this->project_duration,
            'project_start_date' => $this->project_start_date,
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
            //Merge the programs and Meetings into one collection and order them by the order field
            'draggables' => $this->whenLoaded('programs', function () {
                return collect($this->programs)->map(function ($program) {
                    return [
                        'id' => $program->id,
                        'uuid' => $program->uuid,
                        'program_name' => $program->program_name,
                        'type' => 'program', //This is used to identify the type of draggable in the front end
                        'order' => $program->order,
                        'edit_mode' => false,
                        'forms' => collect($program->forms)->pluck('id')->toArray(),
                    ];
                })->merge(collect($this->meetings)->map(function ($meeting) {
                    return [
                        'id' => $meeting->id,
                        'uuid' => $meeting->uuid,
                        'meeting_name' => $meeting->title,
                        'type' => 'meeting', //This is used to identify the type of draggable in the front end
                        'order' => $meeting->order,
                        'edit_mode' => false,
                    ];
                }))->sortBy('order')->values();
            }),


        ];
    }
}

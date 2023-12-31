<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GoalResource extends JsonResource
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
            'goal_description' => $this->goal_description,
            'goal_target' => $this->goal_target,
            'project_id' => $this->project_id,
            'program_id' => $this->program_id,
            'progress' => $this->whenLoaded('goalProgress', function () {
                return $this->goalProgress->map(function ($progress) {
                    return [
                        'id' => $progress->id,
                        'user' => [
                            'id' => $progress->user->id,
                            'name' => $progress->user->name,
                        ],
                        'progress' => $progress->goal_progress,
                        'description' => $progress->goal_description,
                        'created_at' => $progress->created_at->translatedFormat('d F Y h:i A'),
                    ];
                });
            }),
            'current_goal_progress' => $this->whenLoaded('goalProgress', function () {
                return $this->goalProgress->sum('goal_progress');
            }),
            'percentage_completed' => $this->whenLoaded('goalProgress', function () {
                return round($this->goalProgress->sum('goal_progress') / $this->goal_target * 100, 2)
                    > 100 ? 100 : round($this->goalProgress->sum('goal_progress') / $this->goal_target * 100, 2);
            }),
            'contextual_progress' => $this->whenLoaded('goalProgress', function () {
                return $this->goalProgress->sum('goal_progress') >= $this->goal_target ? 'success' : 'info';
            }),
            'conditions' => $this->conditions,
            'created_at' => $this->created_at->translatedFormat('d F, Y h:i A'),
            'updated_at' => $this->updated_at->translatedFormat('d F, Y h:i A'),
        ];
    }
}

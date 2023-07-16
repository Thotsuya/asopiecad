<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public function __construct($resource)
    {
        parent::__construct($resource);
    }

    public function toArray($request)
    {
        return [
            'id'                  => $this->id,
            'uuid'                => $this->uuid,
            'project_name'        => $this->project_name,
            'project_description' => $this->project_description,
            'created_at'          => $this->created_at->translatedFormat('d F Y'),
            'updated_at'          => $this->updated_at->diffForHumans(),
            'beneficiaries_count' => $this->beneficiaries_count,
            'project_duration'    => $this->project_duration,
            'project_start_date'  => $this->project_start_date,
            'users_count'         => $this->users_count,
            'programs_count'      => $this->programs_count,
            'global_goal'         => $this->global_goal,
            'users'               => $this->whenLoaded('users', function () {
                return $this->users->map(function ($user) {
                    return [
                        'id'    => $user->id,
                        'name'  => $user->name,
                        'email' => $user->email
                    ];
                });
            }),
            'can'                 => [
                'edit-project' => auth()->user()->can('edit-project', $this->resource) || auth()->user()->hasRole(
                        'Super Admin'
                    ),
                'view-project' => auth()->user()->can('view-project', $this->resource) || auth()->user()->hasRole(
                        'Super Admin'
                    ),

                'register-beneficiary' => auth()->user()->can('register-beneficiaries', $this->resource) || auth(
                    )->user()->hasRole('Super Admin'),
                'approve-beneficiary'  => auth()->user()->can('approve-beneficiaries', $this->resource) || auth()->user(
                    )->hasRole('Super Admin'),
                'edit-beneficiary'     => auth()->user()->can('edit-beneficiaries', $this->resource) || auth()->user(
                    )->hasRole('Super Admin'),
                'delete-beneficiary'   => auth()->user()->can('delete-beneficiaries', $this->resource) || auth()->user(
                    )->hasRole('Super Admin'),

                'register-appointments' => auth()->user()->can('register-appointments', $this->resource) || auth(
                    )->user()->hasRole('Super Admin'),
                'edit-appointments'     => auth()->user()->can('edit-appointments', $this->resource) || auth()->user(
                    )->hasRole('Super Admin'),

                'register-goals'         => auth()->user()->can('register-goals', $this->resource) || auth()->user(
                    )->hasRole(
                        'Super Admin'
                    ),
                'register-goal-progress' => auth()->user()->can('register-goal-progress', $this->resource) || auth(
                    )->user()->hasRole('Super Admin'),
            ],
            'forms'               => $this->whenLoaded('forms', $this->forms),
            'programs'            => $this->whenLoaded('programs', $this->programs),
            'beneficiaries'       => $this->whenLoaded('beneficiaries', $this->beneficiaries),
            'global_progress'     => $this->globalProgress(),
            'featured_image'      => // return latest media url or placeholder
                $this->getMedia('project_featured_image')->last() ?
                    $this->getMedia('project_featured_image')->last()->getFullUrl() :
                    asset('images/placeholder.png'),

            'grouped_results'     => $this->whenLoaded('groupedResults', $this->groupedResults),
        ];
    }

    private function globalProgress()
    {
        if ($this->global_goal == 0) {
            return 0;
        }

        return ($this->beneficiaries_count / $this->global_goal * 100) > 100 ? 100 : ($this->beneficiaries_count / $this->global_goal * 100);
    }
}



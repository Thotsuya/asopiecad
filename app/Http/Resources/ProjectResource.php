<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public function __construct($resource,$roles = [])
    {
        parent::__construct($resource);
        $this->roles = $roles;
    }

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'project_name' => $this->project_name,
            'project_description' => $this->project_description,
            'created_at' => $this->created_at->translatedFormat('d F Y'),
            'updated_at' => $this->updated_at->diffForHumans(),
            'beneficiaries_count' => $this->beneficiaries_count,
            'users_count' => $this->users_count,
            'programs_count' => $this->programs_count,
            'users' => $this->whenLoaded('users',function ()  {
               return $this->users->map(function ($user) {
                   return [
                       'id' => $user->id,
                       'name' => $user->name,
                       'email' => $user->email,
                       'role' => $this->roles->where('id',$user->pivot->role_id)->first()->name,
                       'abilities' => $this->roles->where('id',$user->pivot->role_id)->first()->permissions->pluck('name')->toArray(),
                   ];
               });
            }),
            'can' => [
                'edit' => auth()->user()->can('edit-project', [$this->resource,$this->roles]),
                'view' => auth()->user()->can('view-project', [$this->resource,$this->roles]),
                'register-beneficiary' => auth()->user()->can('register-beneficiary', [$this->resource,$this->roles]),
                'delete-beneficiary' => auth()->user()->can('delete-beneficiary', [$this->resource,$this->roles]),
            ],
            'forms' => $this->whenLoaded('forms',$this->forms),
            'programs' => $this->whenLoaded('programs',$this->programs),
            'beneficiaries' => $this->whenLoaded('beneficiaries',$this->beneficiaries),
        ];
    }
}

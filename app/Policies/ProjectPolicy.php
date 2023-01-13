<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Database\Eloquent\Collection;

class ProjectPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct(Project $project)
    {
        $this->project = $project;
    }

    public function edit(User $user, Project $project, Collection $roles)
    {
        return $user->projects->contains($project->id) &&
            $roles
                ->where('id', $project->users->where('id', $user->id)->first()->pivot->role_id)
                ->first()
                ->hasPermissionTo('Editar Proyectos');
    }

    public function view(User $user, Project $project, Collection $roles)
    {
        return $user->projects->contains($project->id) &&
            $roles
                ->where('id', $project->users->where('id', $user->id)->first()->pivot->role_id)
                ->first()
                ->hasPermissionTo('Ver Proyectos');
    }


}

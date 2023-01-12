<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Spatie\Permission\Models\Role;

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
        $this->roles = Role::where('name', '!=', 'Super Admin')->get();
    }

    public function edit(User $user, Project $project)
    {
        $role = $project->users()->where('user_id', $user->id)->first()->pivot->role_id;
        return $this->roles->where('id', $role)->first()->hasPermissionTo('Editar Proyectos');
    }

    public function view(User $user, Project $project)
    {
        $role = $project->users()->where('user_id',$user->id)->first()->pivot->role_id;
        return $this->roles->where('id',$role)->first()->hasPermissionTo('Ver Proyectos');
    }


}

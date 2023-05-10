<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class   ProjectPolicy
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

    public function edit(User $user, Project $project)
    {
        return $user->projects->contains($project->id) &&
            $user->hasPermissionTo('Editar Proyectos');
    }

    public function view(User $user, Project $project)
    {
        return $user->projects->contains($project->id) &&
            $user->hasPermissionTo('Ver Proyectos');
    }

    public function registerBeneficiaries(User $user, Project $project)
    {
        // Check if the project has forms to register beneficiaries and that the user has the permission to register beneficiaries
        return $user->projects->contains($project->id) &&
            $user->hasPermissionTo('Registrar Beneficiarios');
    }

    public function approveBeneficiaries(User $user, Project $project)
    {
        // Check if the project has forms to register beneficiaries and that the user has the permission to register beneficiaries
        return $user->projects->contains($project->id) &&
            $user
                ->hasPermissionTo('Aprobar Beneficiarios');
    }

    public function editBeneficiaries(User $user, Project $project)
    {
        // Check if the project has forms to register beneficiaries and that the user has the permission to register beneficiaries
        return $user->projects->contains($project->id) &&
            $user->hasPermissionTo('Editar Beneficiarios');
    }

    public function deleteBeneficiaries(User $user, Project $project)
    {
        // Check if the project has forms to register beneficiaries and that the user has the permission to register beneficiaries
        return $user->projects->contains($project->id) &&
            $user->hasPermissionTo('Eliminar Beneficiarios');
    }

    // Appointments

    public function registerAppointments(User $user, Project $project)
    {
        // Check if the project has forms to register beneficiaries and that the user has the permission to register beneficiaries
        return $user->projects->contains($project->id) &&
            $user
                ->hasPermissionTo('Registrar Visitas');
    }

    public function editAppointments(User $user, Project $project)
    {
        // Check if the project has forms to register beneficiaries and that the user has the permission to register beneficiaries
        return $user->projects->contains($project->id) &&
            $user
                ->hasPermissionTo('Editar Visitas');
    }

    public function registerGoals(User $user, Project $project)
    {
        // Check if the project has forms to register beneficiaries and that the user has the permission to register beneficiaries
        return $user->projects->contains($project->id) &&
            $user
                ->hasPermissionTo('Registrar Metas');
    }

    public function registerGoalProgress(User $user, Project $project)
    {
        // Check if the project has forms to register beneficiaries and that the user has the permission to register beneficiaries
        return $user->projects->contains($project->id) &&
            $user
                ->hasPermissionTo('Registrar avance de Metas');
    }


}

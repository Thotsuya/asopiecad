<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\GoalRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class GoalController extends Controller
{

    public function __construct()
    {
        $this->roles = Role::query()
            ->where('name', '!=', 'Super Admin')
            ->with('permissions')
            ->get();
    }

    public function store(Project $project,GoalRequest $request)
    {
        $project->goals()->create($request->validated());

        return redirect()->route('projects.show',$project);
    }
}

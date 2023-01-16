<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\GoalProgressRequest;
use App\Models\Goal;
use App\Models\Project;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class GoalProgressController extends Controller
{

    public function __construct()
    {
        $this->roles = Role::query()
            ->where('name', '!=', 'Super Admin')
            ->with('permissions')
            ->get();
    }

    public function store(Goal $goal, GoalProgressRequest $request)
    {
        $this->authorize('register-goal-progress', [$goal->project, $this->roles]);
        $goal->goalProgress()->create($request->validated());

        return redirect()->route('projects.show', $goal->project->uuid);
    }
}

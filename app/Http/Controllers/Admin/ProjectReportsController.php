<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\FieldsResource;
use App\Http\Resources\FormsResource;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectReportsController extends Controller
{
    public function index(Project $project)
    {
        return inertia('Reports/Edit', [
            'project' => $project,
            'forms' => FieldsResource::collection($project->forms),
        ]);
    }
}

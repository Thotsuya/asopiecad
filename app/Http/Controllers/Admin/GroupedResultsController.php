<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GroupedResult;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class GroupedResultsController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'project_id' => ['required', 'exists:projects,id'],
            'title' => ['required', 'string'],
            'goals' => ['required', 'array'],
            'goals.*' => ['required', 'exists:goals,id'],
        ]);


        $result = GroupedResult::create([
            'project_id' => $request->project_id,
            'title' => $request->title,
        ]);

        $result->goals()->attach($request->goals);

        Artisan::queue('asopiecad:update-project-reports-table');

        return redirect()->route('projects.show', $result->project->uuid)->with('success', 'Grouped Result created successfully');
    }
}

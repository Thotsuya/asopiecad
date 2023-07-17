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

        //Validate that either goals or meetings array is not empty
        // they both can have values but not empty,
        // for example, goals can have values and meetings can be empty
        // or meetings can have values and goals can be empty
        // but they both can't be empty


        $request->validate([
            'project_id' => ['required', 'exists:projects,id'],
            'title' => ['required', 'string'],
            'goals' => ['required_without:meetings', 'array'],
            'meetings' => ['required_without:goals', 'array'],
            'goals.*' => ['required_with:goals', 'exists:goals,id'],
            'meetings.*' => ['required_with:meetings', 'exists:meetings,id'],
        ]);



        $result = GroupedResult::create([
            'project_id' => $request->project_id,
            'title' => $request->title,
        ]);

        if($request->has('goals')){
            $result->goals()->attach($request->goals);
        }

        if($request->has('meetings')){
            $result->meetings()->attach($request->meetings);
        }

        Artisan::queue('asopiecad:update-project-reports-table');

        return redirect()->route('projects.show', $result->project->uuid)->with('success', 'Grouped Result created successfully');
    }
}

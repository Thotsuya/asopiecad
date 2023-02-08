<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProgramRequest;
use App\Models\Program;
use App\Models\Project;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function store(Project $project, ProgramRequest $request)
    {
        $program = $project->programs()->create($request->validated());
        $program->forms()->sync($request->forms);

        return redirect()->route('projects.edit', $project);
    }

    public function order(Project $project, Request $request)
    {
        collect($request->programs)->each(function($program, $index) use ($project) {
            $project->programs()->where('uuid', $program['uuid'])->update(['order' => $index + 1]);
        });

        return redirect()->route('projects.edit', $project);
    }

    public function update(Program $program, ProgramRequest $request)
    {
        $program->update($request->validated());
        $program->forms()->sync($request->forms);

        return redirect()->route('projects.edit', $program->project);
    }

    public function destroy(Program $program)
    {
        $program->delete();
        return redirect()->route('projects.edit', $program->project);
    }
}

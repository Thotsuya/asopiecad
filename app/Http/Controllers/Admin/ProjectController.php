<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;
use App\Http\Requests\ProjectUpdateRequest;
use App\Models\Form;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return inertia('Projects/Index', [
            'projects' => Project::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProjectRequest $request)
    {
        $project = Project::create($request->validated());
        $project->users()->attach(auth()->id());
        return redirect()->route('projects.edit', $project);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function show(Project $project)
    {
        return $project->load('programs', 'beneficiaries', 'users', 'form');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function edit(Project $project)
    {
        return inertia('Projects/Edit', [
            'project' => $project->load('forms', 'users', 'beneficiaries', 'programs'),
            'forms' => Form::select('id', 'form_name')->get(),
            'users' => User::all(),
            'roles' => Role::where('name', '!=', User::SUPER_ADMIN)->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ProjectUpdateRequest $request, Project $project)
    {
        $project->update([
            'project_name' => $request->project_name,
            'project_description' => $request->project_description,
        ]);

        if($request->validated()['users']){
            $project->users()->sync($request->validated()['users']);
        }

        if($request->validated()['programs']){
            // If the program was deleted, delete the program based on the uuid, check if the uuid is in the request
            $programsWithUuid = $project->programs->pluck('uuid')->toArray();
            $programsWithUuidInRequest = collect($request->validated()['programs'])->pluck('uuid')->toArray();


            $programsToDelete = array_diff($programsWithUuid, $programsWithUuidInRequest);

            foreach($programsToDelete as $programToDelete){
                $project->programs()->where('uuid', $programToDelete)->delete();
            }

            // If the program was edited, update the program based on the uuid, if not create a new program
            foreach($request->validated()['programs'] as $program){
                $project->programs()->updateOrCreate(['uuid' => $program['uuid']], [
                    'program_name' => $program['program_name'],
                    'order' => $program['order'],
                ]);
            }
        }

        if($request->validated()['forms']){
            $project->forms()->sync($request->validated()['forms']);
        }

        return redirect()->route('projects.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

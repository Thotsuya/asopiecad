<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;
use App\Http\Requests\ProjectUpdateRequest;
use App\Http\Resources\AppointmentResource;
use App\Http\Resources\BeneficiaryResource;
use App\Http\Resources\GoalResource;
use App\Http\Resources\PaginatedProgramsResource;
use App\Http\Resources\ProgramsResource;
use App\Http\Resources\ProjectEditResource;
use App\Http\Resources\ProjectResource;
use App\Models\Benefitiary;
use App\Models\Form;
use App\Models\Project;
use App\Models\User;
use Spatie\Permission\Models\Role;

class ProjectController extends Controller
{

    public function __construct()
    {
        $this->roles = Role::query()
            ->where('name', '!=', 'Super Admin')
            ->with('permissions')
            ->get();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index()
    {

        $projects = auth()->user()->hasRole(User::SUPER_ADMIN)
            ? Project::query()
            : Project::query()
                ->whereHas('users', function ($query) {
                    $query->where('user_id', auth()->id());
                });

        return inertia('Projects/Index', [
            'projects' => $projects
                ->withCount('beneficiaries', 'users','programs')
                ->latest('id')
                ->paginate(6)
                ->through(function (Project $project) {
                    return ProjectResource::make($project, $this->roles);
                }),
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProjectRequest $request)
    {
        $project = Project::create($request->validated());
        $role = Role::where('name', '!=', 'Super Admin')->first();

        $project->users()->attach(auth()->id());
        return redirect()->route('projects.edit', $project);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function show(Project $project)
    {
        return inertia('Projects/Show', [
            // Paginate the beneficiaries
            'beneficiaries' => $project->beneficiaries()
                ->latest('id')
                ->with('programs', 'appointments','forms')
                ->withTrashed()
                ->paginate(20)
                ->through(function ($beneficiary) {
                    return BeneficiaryResource::make($beneficiary);
                }),
            'paginated_programs' => $project->programs()
                ->with('beneficiaries')
                ->withCount('beneficiaries')
                ->latest('id')
                ->paginate(20)
                ->through(function ($program) {
                    return PaginatedProgramsResource::make($program);
                }),
            'programs' => ProgramsResource::collection($project->programs()
                ->with(['forms.tabs','forms.fields','beneficiaries'])
                ->oldest()
                ->get()),
            'appointments' => AppointmentResource::collection($project->appointments->load('user', 'benefitiary')),
            'paginated_appointments' => $project->appointments()
                ->with(['benefitiary', 'user'])
                ->latest('id')
                ->paginate(20)
                ->through(function ($appointment) {
                    return AppointmentResource::make($appointment);
                }),
            'beneficiaries_not_in_project' => Benefitiary::query()
                ->select('id', 'uuid', 'name')
                ->get(),
            'project' => new ProjectResource(
                $project
                    ->load('beneficiaries', 'users','programs')
                    ->loadCount('beneficiaries', 'users', 'programs')),
            'goals' => $project->goals()
                ->oldest()
                ->with(['project', 'program'])
                ->paginate(20)
                ->through(function ($goal) {
                    return GoalResource::make($goal);
                }),
            'forms' => Form::query()
                ->with('tabs.fields')
                ->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function edit(Project $project)
    {
        return inertia('Projects/Edit', [
            'project' => new ProjectEditResource($project->load( 'users', 'beneficiaries', 'programs.forms')),
            'forms' => Form::select('id', 'form_name')->get(),
            'users' => User::all(),
            'roles' => Role::where('name', '!=', User::SUPER_ADMIN)->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ProjectUpdateRequest $request, Project $project)
    {
        $project->update([
            'project_name' => $request->project_name,
            'project_description' => $request->project_description,
            'project_duration' => $request->project_duration,
            'project_start_date' => $request->project_start_date,
            'global_goal' => $request->global_goal,
        ]);

        if ($request->validated()['users']) {
            $project->users()->sync($request->validated()['users']);
        }

        return redirect()->route('projects.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

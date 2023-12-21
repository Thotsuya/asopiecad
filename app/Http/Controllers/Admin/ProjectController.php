<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;
use App\Http\Requests\ProjectUpdateRequest;
use App\Http\Resources\AppointmentResource;
use App\Http\Resources\BeneficiaryResource;
use App\Http\Resources\GoalResource;
use App\Http\Resources\MeetingResource;
use App\Http\Resources\PaginatedProgramsResource;
use App\Http\Resources\ProgramsResource;
use App\Http\Resources\ProjectEditResource;
use App\Http\Resources\ProjectResource;
use App\Models\Benefitiary;
use App\Models\Form;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index()
    {

        $projects =
            Project::
                when(!auth()->user()->hasRole(User::SUPER_ADMIN), function ($query) {
                    $query->whereHas('users', function ($query) {
                        $query->where('user_id', auth()->id());
                    });
                })
                ->with('media')
                ->latest('id')
                ->get();


        return inertia('Projects/Index', [
            'projects' => ProjectResource::collection($projects),
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
    public function show(Project $project, Request $request)
    {
        return inertia('Projects/Show', [
            // Paginate the beneficiaries
            'beneficiaries' => $project
                ->beneficiaries()
                ->when($request->has('search'), function ($query) use ($request) {
                    $query->where('name', 'like', "%{$request->search}%");
                })
                ->latest('id')
                ->with('programs', 'appointments','forms')
                // Remove global scope
                ->withTrashed()
                ->paginate(20)
                ->through(function ($beneficiary) {
                    return BeneficiaryResource::make($beneficiary);
                })
                ->withQueryString(),
            'paginated_programs' => $project->programs()
                ->select('id', 'program_name', 'project_id')
//                ->with(['beneficiaries' => function ($query) use ($request) {
//                    $query
//                        ->select('benefitiaries.id', 'name', 'approved_at','benefitiaries.uuid')
//                        ->whereNotNull('approved_at');
//                }])
                ->withCount([
                    'beneficiaries' => function ($query) use ($request) {
                        $query->whereNotNull('approved_at');
                    },
                ])
                ->orderBy('order')
                ->paginate(20)
                ->through(function ($program) {
                    return PaginatedProgramsResource::make($program);
                }),
            'programs' => Cache::remember('programs',60 * 60 * 24, function () use ($project) {
                return ProgramsResource::collection(
                    $project->programs()
                        ->with([
                            'forms.tabs',
                            'forms.fields',
                        ])
                        ->orderBy('order')
                        ->get());
            }),
            'appointments' => Cache::remember('appointments-' . $project->id, 60 * 60, function () use ($project) {
                return AppointmentResource::collection($project
                    ->appointments()
                    ->with(['benefitiary', 'user'])
                    ->latest('id')
                    ->get()
                );
            }),
            'paginated_appointments' => $project->appointments()
                ->with(['benefitiary', 'user'])
                ->latest('id')
                ->paginate(20)
                ->through(function ($appointment) {
                    return AppointmentResource::make($appointment);
                }),
//            'beneficiaries_not_in_project' => Benefitiary::query()
//                ->select('id', 'uuid', 'name')
//                ->get(),
            'project' => new ProjectResource(
                $project
                    ->loadMissing('users','programs','groupedResults','meetings')
                    ->loadCount('beneficiaries', 'users', 'programs')),
            'goals' => $project->goals()
                ->oldest()
                ->with(['project', 'program'])
                ->paginate(20)
                ->through(function ($goal) {
                    return GoalResource::make($goal);
                }),
            'unpaginated_goals' => $project
                ->goals()
                ->select('id', 'goal_description', 'project_id', 'program_id')
                ->oldest()
                ->get(),
            'forms' => Form::query()
                ->with('tabs.fields')
                ->get(),

            'meetings' => $project->meetings()
                ->select('id', 'uuid', 'title', 'project_id', 'order', 'count')
                ->latest()
                ->paginate(20)
                ->through(function ($meeting) {
                    return MeetingResource::make($meeting);
                }),
            'inventory' => $project->inventory()
                ->with('inventoryItems')
                ->get()
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
            'project' => new ProjectEditResource($project->load( 'users', 'beneficiaries', 'programs.forms','meetings')),
            'forms' => Form::select('id', 'form_name')->get(),
            'users' => User::with('roles.permissions','permissions')->get()
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

        if($request->validated()['project_featured_image']){
            $project->addMediaFromRequest('project_featured_image')
                ->toMediaCollection('project_featured_image');
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

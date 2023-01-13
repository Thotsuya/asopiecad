<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BeneficiaryStoreRequest;
use App\Http\Resources\BeneficiaryFormsResource;
use App\Http\Resources\FormsResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class ProjectFormController extends Controller
{
    public function __construct()
    {
        $this->roles =  Role::query()
            ->where('name', '!=', 'Super Admin')
            ->with('permissions')
            ->get();
    }

    public function create(Request $request,Project $project){

        $this->authorize('register-beneficiaries',[$project,$this->roles]);
        $forms = $project->forms()->get();

        return inertia('Beneficiares/Create',[
            'project' => $project,
            'forms' => BeneficiaryFormsResource::collection($forms),
            'is_new' => true,
        ]);
    }

    public function store(BeneficiaryStoreRequest $request, Project $project){
        return $request->validated();
        $this->authorize('register-beneficiaries',[$project,$this->roles]);
    }
}

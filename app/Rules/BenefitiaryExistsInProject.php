<?php

namespace App\Rules;

use App\Models\Benefitiary;
use App\Models\Project;
use Illuminate\Contracts\Validation\Rule;

class BenefitiaryExistsInProject implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($beneficiary_id, $project_id,$is_new_beneficiary,$data_only)
    {
        $this->beneficiary_id = $beneficiary_id;
        $this->project_id = $project_id;
        $this->is_new_beneficiary = $is_new_beneficiary;
        $this->data_only = $data_only;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if($this->is_new_beneficiary || $this->data_only){
            return true;
        }

        $beneficiary = Benefitiary::find($this->beneficiary_id);
        $project = Project::find($this->project_id);

        return !$beneficiary->projects->contains($project->id);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'El beneficiario ya existe en el proyecto';
    }
}

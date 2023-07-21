<?php

namespace App\Console\Commands;

use App\Models\BeneficiaryReport;
use App\Models\Benefitiary;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class UpdateBeneficiariesReportTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asopiecad:update-beneficiaries-report-table';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update the beneficiaries report table with the new fields from the beneficiary table migration';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info("Updating beneficiaries report table...");

        $beneficiaries_collection = collect();

        $beneficiaries = Benefitiary::query()
            ->withTrashed()
            ->viewableBy(User::find(1))
            ->withCount('projects')
            ->with(['answers.pivot.field', 'answers.pivot','projects'])
            ->latest('id')
            ->get()
            ->map(function ($beneficiary) {
                return [
                    'id'              => $beneficiary->id,
                    'uuid'            => $beneficiary->uuid,
                    'internal_status' => $beneficiary->internal_status,
                    'name'            => $beneficiary->name,
                    'projects'        => // return a string, with all the project names separated by comma
                        $beneficiary->projects->map(function ($project) {
                            return $project->project_name;
                        })->implode(', '),
                    'answers'         => $beneficiary->answers->map(function ($answer) {
                        return [
                            'field'  => $answer->pivot->field->name,
                            'answer' => $this->getAnswerValue($answer),
                        ];
                    })->values()->toArray(),
                ];
            });

        BeneficiaryReport::create([
            'title' => 'All Beneficiaries',
            'fields' => $beneficiaries->toArray(),
            'generated_at' => now()
        ]);

        $this->info("Beneficiaries report table updated successfully!");
    }

    private function getAnswerValue($answer)
    {
        if ($answer->pivot->field->type === 'select') {
            //  return $answer->pivot->field->options->where('value', json_decode($answer->pivot->value))->first()->name;
            return  Arr::get(collect($answer->pivot->field->options)->where('value', $answer->pivot->value)->first(), 'name', null);
        }

        if ($answer->pivot->field->type === 'select multiple') {
//            return $answer->pivot->field->options->whereIn('value', json_decode($answer->pivot->value))->pluck('name')->implode(', ');
            return collect($answer->pivot->field->options)->whereIn('value', json_decode($answer->pivot->value))->pluck(
                'name'
            )->implode(', ');
        }

        return Str::startsWith($answer->pivot->value, '["') && Str::endsWith($answer->pivot->value, '"]')
            ? json_decode($answer->pivot->value) : $answer->pivot->value;
    }
}

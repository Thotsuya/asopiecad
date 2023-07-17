<?php

namespace App\Console\Commands;

use App\Models\Project;
use App\Models\Screening;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class AddExistingScreeningsToTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asopiecad:add-existing-screenings-to-table';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Adds Existing P-4353 Screenings to the screenings table';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $beneficiaries = \App\Models\Benefitiary::query()
            ->whereHas('projects', function ($query) {
                $query->where('project_name', '4353-MYP-CBM Programa de Salud Ocular Comunitaria');
            })
            //Where belongs to many program whose id is 24
            ->whereHas('programs', function ($query) {
                $query->where('programs.id', 24);
            })
            ->with(['answers.pivot.field'])
            ->get()
            ->each(function ($beneficiary) {

                $this->info("Adding Screening for {$beneficiary->name}");
                $answers = $beneficiary->answers->reduce(function ($carry, $answer) {
                    $carry[$answer->pivot->field->name] = Str::startsWith($answer->pivot->value, '["') ? json_decode($answer->pivot->value) : $answer->pivot->value;
                    return $carry;
                }, []);

                Screening::updateOrCreate([
                    'name' => $beneficiary->name
                ],[
                    'first_name' => $answers['1er Nombre'],
                    'second_name' => $answers['2do Nombre'],
                    'first_surname' => $answers['1er Apellido'],
                    'second_surname' => $answers['2do Apellido'],
                    'gender' => $answers['Sexo'],
                    'age' => $answers['Edad'] ?? 0,
                    'disability_yes_no' => $answers['Discapacidad ( Si / No )'],
                    'disability_type' => $answers['Tipo de Discapacidad o alteración en el desarrollo'],
                    'date_of_screening' => now(),
                    'department' => // Trim the -[number] from the department name
                        explode('-', $answers['Departamentos'])[0],
                    'municipality' => Str::lower($answers['Municipio']),
                    'address' => $answers['Dirección'],
                    'document' => $answers['Cédula de Identidad'],
                    'type' => 'P-4353',
                    'screened_refered' => $answers['Referidos'],
                    'screened_municipality' => Str::lower($answers['Municipio']),
                    'screened_deparment' => explode('-', $answers['Departamentos'])[0],
                    'screened_visual_acuity_right' => $answers['Agudeza Visual OD'],
                    'screened_visual_acuity_left' => $answers['Agudeza Visual OI'],
                    'screened_observations' => $answers['Observaciones '],
                    'screened_visual_acuity' => $answers['Agudeza Visual'],
                    'screened_phone_number' => $answers['Teléfono'],
                    'registrant_name' => 'Default',
                    'date_of_birth' => $answers['Fecha de Nacimiento'],
                    'user_id' => 1,
                ]);

            });
    }
}

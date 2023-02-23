<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $data = [
            [
                    'project_name' => 'Proyecto 4211',
                    'project_duration' => 4,
                    'project_start_date' => '2021-01-01',
                    'programs' => [
                        ['program_name' => 'Grupo de Interés', 'form_id' => 1],
                        ['program_name' => 'Grupo de Auto Ayuda', 'form_id' => 1],
                        ['program_name' => 'Lilliane Fonds', 'form_id' => 2],
                        ['program_name' => 'Grupo de Apoyo Escolar', 'form_id' => 3],
                        ['program_name' => 'Estimulación Temprana', 'form_id' => 1],
                        ['program_name' => 'Grupo Inclusion Laboral', 'form_id' => 1],
                        ['program_name' => 'Primera Ayuda Psicologíca', 'form_id' => 1],
                        ['program_name' => 'Inclusión laboral todos con vos', 'form_id' => 4],
                        ['program_name' => 'Inclusión laboral Gobernación', 'form_id' => 4],
                    ]
            ]
        ];

        collect($data)->each(function ($project) {
            $proj = Project::create([
                'project_name' => $project['project_name'],
                'project_duration' => $project['project_duration'],
                'project_start_date' => $project['project_start_date'],
            ]);

            collect($project['programs'])->each(function ($program) use ($proj) {
                $prog = $proj->programs()->create([
                    'program_name' => $program['program_name'],
                ]);

                $prog->forms()->attach($program['form_id']);
            });


        });

    }
}

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
        $project = Project::create([
            'project_name'       => 'Estimulación Temprana de niños, niñas con discapacidad y alteraciones en el desarrollo ',
            'project_duration'   => 4,
            'project_start_date' => now()->subYears(3)
        ]);

        $project->users()->attach(1);

        $programs = [
            ['program_name' => 'Atención temprana 01.04',],
            ['program_name' => 'Inclusión educativa 02.01'],
        ];

        collect($programs)->each(function ($program) use ($project) {
            $program = $project->programs()->create($program);

            $program->forms()->attach(1);
        });
    }
}

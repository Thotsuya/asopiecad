<?php

namespace Database\Seeders;

use App\Models\Benefitiary;
use App\Models\Project;
use Illuminate\Database\Seeder;

class BenefitiarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
         * Daniela Auxiliadora Duarte Rios
            Danielka Rashell Amador
            Delvis Samuel Hurtado
            Doniel Joel Acevedo
            Elsa Izayana Martinez
            Elyer Dariel Martinez Florez
            Francisco Julian Guevara
            Jerick Isaias Otero Hernandez
            Jonny Josue Mejia Miranda
            Layonel Dayan Urbina Leon
            Linzie Josabeth Florez Jaime
            Margarita Michele Salgado Lopez
            Mariluz Chavaria Fernandez
            Mateo Alejandro Narvaez Rodrigue
            Miguel Angel Suazo Ortiz
            Natali Yuleydi Amador Peralta
            Roxana Maria Mejia Miranda
            Yelking Josue Zeledon Vargas
            yelkys Leosmari Ordoñes Lumbi
            Yosyari de los Angeles Rodriguez Vargas
            Aitana Milagros Baez
            Erik Alberto Orozco Rosales
            Jhosmar Cabrera López
            Jose Luis Ortiz Téllez
            María Magdalena García Pérez
            Sherling Smith López
         *  */


        /*
         *
         *
         */

        $beneficiaries = [
            [
                'name'            => 'Daniela Auxiliadora Duarte Rios',
                'internal_status' => Benefitiary::INTERNAL_STATUSES['approved'],
                'approved_at'     => now(),
                'form_data'       => [
                    "Daniela Auxiliadora Duarte Rios",
                    "3",
                    "f-2",
                    "2018-05-23",
                    "",
                    ["sindrome-de-down-20"],
                    "B. San Antonio del comedor infantil3 c al oeste 1 c al norte",
                    "B. San Antonio",
                    "Juigalpa",
                    "chontales-14",
                    "88218643",
                    "Dania Dinora Rios Taleno",
                    "2021-09-23",
                ]
            ],
            [
                'name'            => 'Danielka Rashell Amador',
                'internal_status' => Benefitiary::INTERNAL_STATUSES['approved'],
                'approved_at'     => now(),
                'form_data'       => [
                    "Danielka Rashell Amador",
                    "37",
                    "m-1",
                    "2018-05-23",
                    "Pariatur Et et et n",
                    ["sindrome-de-down-20",],
                    "Autem similique tene",
                    "Quasi ex ipsa neque",
                    "Facilis incidunt at",
                    "managua-3",
                    "Consectetur qui cons",
                    "Anim ipsam optio de",
                    "2022-10-22",
                ]
            ]
        ];

        $project = Project::first();
        $program = $project->programs()->where('program_name', 'Atención temprana 01.04')->first();
        $forms = $program->forms()->first();



        collect($beneficiaries)->each(function ($benefitiary) use ($program, $forms) {


            $beneficiary = $program->beneficiaries()->create([
                'name'            => $benefitiary['name'],
                'internal_status' => $benefitiary['internal_status'],
                'approved_at'     => $benefitiary['approved_at'],
            ]);

            $forms->fields()->each(function ($field, $index) use ($beneficiary, $benefitiary) {
                $field->benefitiaries()->attach($beneficiary, [
                    'value' => is_array($benefitiary['form_data'][$index]) ? json_encode($benefitiary['form_data'][$index]) : $benefitiary['form_data'][$index]
                ]);
            });

            $beneficiary->forms()->attach($forms);
            $beneficiary->projects()->attach($program->project);

        });
    }
}

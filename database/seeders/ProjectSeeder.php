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

        $form_1_conditions = [
        [
            "label" => "Niños menores de 18 años con discapacidad",
            "conditions" => [
                [
                    "form_id" => 1,
                    "operand" => "==",
                    "field_id" => 2,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "sexo-formulario-de-registro-1-1",
                    "field_type" => "select",
                    "field_value" => [
                        "m-1",
                    ],
                ],
                [
                    "form_id" => 1,
                    "operand" => "<",
                    "field_id" => 3,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "edad-formulario-de-registro-1-1",
                    "field_type" => "number",
                    "field_value" => "18",
                ],
                [
                    "form_id" => 1,
                    "operand" => "not contains",
                    "field_id" => 4,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "tipo-de-discapacidad-o-alteracion-en-el-desarrollo-formulario-de-registro-1-1",
                    "field_type" => "select multiple",
                    "field_value" => [
                        "sin-discapacidad-1",
                    ],
                ],
            ],
        ],
        [
            "label" => "Niñas menores de 18 años con discapacidad",
            "conditions" => [
                [
                    "form_id" => 1,
                    "operand" => "==",
                    "field_id" => 2,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "sexo-formulario-de-registro-1-1",
                    "field_type" => "select",
                    "field_value" => [
                        "f-2",
                    ],
                ],
                [
                    "form_id" => 1,
                    "operand" => "<",
                    "field_id" => 3,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "edad-formulario-de-registro-1-1",
                    "field_type" => "number",
                    "field_value" => "18",
                ],
                [
                    "form_id" => 1,
                    "operand" => "not contains",
                    "field_id" => 4,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "tipo-de-discapacidad-o-alteracion-en-el-desarrollo-formulario-de-registro-1-1",
                    "field_type" => "select multiple",
                    "field_value" => [
                        "sin-discapacidad-1",
                    ],
                ],
            ],
        ],
        [
            "label" => "Hombres mayores de 18 años con discapacidad",
            "conditions" => [
                [
                    "form_id" => 1,
                    "operand" => "==",
                    "field_id" => 2,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "sexo-formulario-de-registro-1-1",
                    "field_type" => "select",
                    "field_value" => [
                        "m-1",
                    ],
                ],
                [
                    "form_id" => 1,
                    "operand" => ">=",
                    "field_id" => 3,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "edad-formulario-de-registro-1-1",
                    "field_type" => "number",
                    "field_value" => "18",
                ],
                [
                    "form_id" => 1,
                    "operand" => "not contains",
                    "field_id" => 4,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "tipo-de-discapacidad-o-alteracion-en-el-desarrollo-formulario-de-registro-1-1",
                    "field_type" => "select multiple",
                    "field_value" => [
                        "sin-discapacidad-1",
                    ],
                ],
            ],
        ],
        [
            "label" => "Mujeres mayores de 18 años con discapacidad",
            "conditions" => [
                [
                    "form_id" => 1,
                    "operand" => "==",
                    "field_id" => 2,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "sexo-formulario-de-registro-1-1",
                    "field_type" => "select",
                    "field_value" => [
                        "f-2",
                    ],
                ],
                [
                    "form_id" => 1,
                    "operand" => ">=",
                    "field_id" => 3,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "edad-formulario-de-registro-1-1",
                    "field_type" => "number",
                    "field_value" => "18",
                ],
                [
                    "form_id" => 1,
                    "operand" => "not contains",
                    "field_id" => 4,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "tipo-de-discapacidad-o-alteracion-en-el-desarrollo-formulario-de-registro-1-1",
                    "field_type" => "select multiple",
                    "field_value" => [
                        "sin-discapacidad-1",
                    ],
                ],
            ],
        ],
        [
            "label" => "Niños menores de 18 años sin discapacidad",
            "conditions" => [
                [
                    "form_id" => 1,
                    "operand" => "==",
                    "field_id" => 2,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "sexo-formulario-de-registro-1-1",
                    "field_type" => "select",
                    "field_value" => [
                        "m-1",
                    ],
                ],
                [
                    "form_id" => 1,
                    "operand" => "<",
                    "field_id" => 3,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "edad-formulario-de-registro-1-1",
                    "field_type" => "number",
                    "field_value" => "18",
                ],
                [
                    "form_id" => 1,
                    "operand" => "contains",
                    "field_id" => 4,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "tipo-de-discapacidad-o-alteracion-en-el-desarrollo-formulario-de-registro-1-1",
                    "field_type" => "select multiple",
                    "field_value" => [
                        "sin-discapacidad-1",
                    ],
                ],
            ],
        ],
        [
            "label" => "Niñas menores de 18 años sin discapacidad",
            "conditions" => [
                [
                    "form_id" => 1,
                    "operand" => "==",
                    "field_id" => 2,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "sexo-formulario-de-registro-1-1",
                    "field_type" => "select",
                    "field_value" => [
                        "f-2",
                    ],
                ],
                [
                    "form_id" => 1,
                    "operand" => "<",
                    "field_id" => 3,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "edad-formulario-de-registro-1-1",
                    "field_type" => "number",
                    "field_value" => "18",
                ],
                [
                    "form_id" => 1,
                    "operand" => "contains",
                    "field_id" => 4,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "tipo-de-discapacidad-o-alteracion-en-el-desarrollo-formulario-de-registro-1-1",
                    "field_type" => "select multiple",
                    "field_value" => [
                        "sin-discapacidad-1",
                    ],
                ],
            ],
        ],
        [
            "label" => "Hombres mayores de 18 años sin discapacidad",
            "conditions" => [
                [
                    "form_id" => 1,
                    "operand" => "==",
                    "field_id" => 2,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "sexo-formulario-de-registro-1-1",
                    "field_type" => "select",
                    "field_value" => [
                        "m-1",
                    ],
                ],
                [
                    "form_id" => 1,
                    "operand" => ">=",
                    "field_id" => 3,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "edad-formulario-de-registro-1-1",
                    "field_type" => "number",
                    "field_value" => "18",
                ],
                [
                    "form_id" => 1,
                    "operand" => "contains",
                    "field_id" => 4,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "tipo-de-discapacidad-o-alteracion-en-el-desarrollo-formulario-de-registro-1-1",
                    "field_type" => "select multiple",
                    "field_value" => [
                        "sin-discapacidad-1",
                    ],
                ],
            ],
        ],
        [
            "label" => "Mujeres mayores de 18 años sin discapacidad",
            "conditions" => [
                [
                    "form_id" => 1,
                    "operand" => "==",
                    "field_id" => 2,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "sexo-formulario-de-registro-1-1",
                    "field_type" => "select",
                    "field_value" => [
                        "m-1",
                    ],
                ],
                [
                    "form_id" => 1,
                    "operand" => ">=",
                    "field_id" => 3,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "edad-formulario-de-registro-1-1",
                    "field_type" => "number",
                    "field_value" => "18",
                ],
                [
                    "form_id" => 1,
                    "operand" => "contains",
                    "field_id" => 4,
                    "form_slug" => "formulario-de-registro-1",
                    "field_slug" => "tipo-de-discapacidad-o-alteracion-en-el-desarrollo-formulario-de-registro-1-1",
                    "field_type" => "select multiple",
                    "field_value" => [
                        "sin-discapacidad-1",
                    ],
                ],
            ],
        ],
    ];
        $form_5_conditions = [
            [
                "label" => "Niños menores de 18 años con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 5,
                        "operand" => "==",
                        "field_id" => 43,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "sexo-3-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                    ],
                    [
                        "form_id" => 5,
                        "operand" => "<",
                        "field_id" => 44,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "edad-3-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 5,
                        "operand" => "==",
                        "field_id" => 45,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "discapacidad-si-no-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                    ],
                ],
            ],
            [
                "label" => "Niñas menores de 18 años con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 5,
                        "operand" => "==",
                        "field_id" => 43,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "sexo-3-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "select",
                        "field_value" => [
                            "f-2",
                        ],
                    ],
                    [
                        "form_id" => 5,
                        "operand" => "<",
                        "field_id" => 44,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "edad-3-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 5,
                        "operand" => "==",
                        "field_id" => 45,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "discapacidad-si-no-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                    ],
                ],
            ],
            [
                "label" => "Hombres mayores de 18 años con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 5,
                        "operand" => "==",
                        "field_id" => 43,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "sexo-3-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                    ],
                    [
                        "form_id" => 5,
                        "operand" => ">=",
                        "field_id" => 44,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "edad-3-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 5,
                        "operand" => "==",
                        "field_id" => 45,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "discapacidad-si-no-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                    ],
                ],
            ],
            [
                "label" => "Mujeres mayores de 18 años con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 5,
                        "operand" => "==",
                        "field_id" => 43,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "sexo-3-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "select",
                        "field_value" => [
                            "f-2",
                        ],
                    ],
                    [
                        "form_id" => 5,
                        "operand" => ">=",
                        "field_id" => 44,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "edad-3-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 5,
                        "operand" => "==",
                        "field_id" => 45,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "discapacidad-si-no-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                    ],
                ],
            ],
            [
                "label" => "Niños menores de 18 años sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 5,
                        "operand" => "==",
                        "field_id" => 43,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "sexo-3-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                    ],
                    [
                        "form_id" => 5,
                        "operand" => "<",
                        "field_id" => 44,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "edad-3-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 5,
                        "operand" => "==",
                        "field_id" => 45,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "discapacidad-si-no-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                    ],
                ],
            ],
            [
                "label" => "Niñas menores de 18 años sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 5,
                        "operand" => "==",
                        "field_id" => 43,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "sexo-3-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "select",
                        "field_value" => [
                            "f-2",
                        ],
                    ],
                    [
                        "form_id" => 5,
                        "operand" => "<",
                        "field_id" => 44,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "edad-3-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 5,
                        "operand" => "==",
                        "field_id" => 45,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "discapacidad-si-no-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                    ],
                ],
            ],
            [
                "label" => "Hombres mayores de 18 años sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 5,
                        "operand" => "==",
                        "field_id" => 43,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "sexo-3-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                    ],
                    [
                        "form_id" => 5,
                        "operand" => ">=",
                        "field_id" => 44,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "edad-3-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 5,
                        "operand" => "==",
                        "field_id" => 45,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "discapacidad-si-no-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                    ],
                ],
            ],
            [
                "label" => "Mujeres mayores de 18 años sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 5,
                        "operand" => "==",
                        "field_id" => 43,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "sexo-3-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                    ],
                    [
                        "form_id" => 5,
                        "operand" => ">=",
                        "field_id" => 44,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "edad-3-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 5,
                        "operand" => "==",
                        "field_id" => 45,
                        "form_slug" => "formulario-de-capacitacion-a-docentes",
                        "field_slug" => "discapacidad-si-no-formulario-de-capacitacion-a-docentes-5",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                    ],
                ],
            ],
        ];
        $form_7_conditions = [
            [
                "label" => "Niños menores de 18 años con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 7,
                        "operand" => "==",
                        "field_id" => 65,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "sexo-5-formulario-de-instructores-7",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                    ],
                    [
                        "form_id" => 7,
                        "operand" => "<",
                        "field_id" => 66,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "edad-5-formulario-de-instructores-7",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 7,
                        "operand" => "==",
                        "field_id" => 67,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "discapacidad-si-no-2-formulario-de-instructores-7",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                    ],
                ],
            ],
            [
                "label" => "Niñas menores de 18 años con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 7,
                        "operand" => "==",
                        "field_id" => 65,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "sexo-5-formulario-de-instructores-7",
                        "field_type" => "select",
                        "field_value" => [
                            "f-2",
                        ],
                    ],
                    [
                        "form_id" => 7,
                        "operand" => "<",
                        "field_id" => 66,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "edad-5-formulario-de-instructores-7",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 7,
                        "operand" => "==",
                        "field_id" => 67,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "discapacidad-si-no-2-formulario-de-instructores-7",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                    ],
                ],
            ],
            [
                "label" => "Hombres mayores de 18 años con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 7,
                        "operand" => "==",
                        "field_id" => 65,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "sexo-5-formulario-de-instructores-7",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                    ],
                    [
                        "form_id" => 7,
                        "operand" => ">=",
                        "field_id" => 66,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "edad-5-formulario-de-instructores-7",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 7,
                        "operand" => "==",
                        "field_id" => 67,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "discapacidad-si-no-2-formulario-de-instructores-7",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                    ],
                ],
            ],
            [
                "label" => "Mujeres mayores de 18 años con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 7,
                        "operand" => "==",
                        "field_id" => 65,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "sexo-5-formulario-de-instructores-7",
                        "field_type" => "select",
                        "field_value" => [
                            "f-2",
                        ],
                    ],
                    [
                        "form_id" => 7,
                        "operand" => ">=",
                        "field_id" => 66,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "edad-5-formulario-de-instructores-7",
                        "field_type" => "number",
                        "field_value" => "17",
                    ],
                    [
                        "form_id" => 7,
                        "operand" => "==",
                        "field_id" => 67,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "discapacidad-si-no-2-formulario-de-instructores-7",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                    ],
                ],
            ],
            [
                "label" => "Niños menores de 18 años sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 7,
                        "operand" => "==",
                        "field_id" => 65,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "sexo-5-formulario-de-instructores-7",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                    ],
                    [
                        "form_id" => 7,
                        "operand" => "<",
                        "field_id" => 66,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "edad-5-formulario-de-instructores-7",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 7,
                        "operand" => "==",
                        "field_id" => 67,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "discapacidad-si-no-2-formulario-de-instructores-7",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                    ],
                ],
            ],
            [
                "label" => "Niñas menores de 18 años sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 7,
                        "operand" => "==",
                        "field_id" => 65,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "sexo-5-formulario-de-instructores-7",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                    ],
                    [
                        "form_id" => 7,
                        "operand" => "<",
                        "field_id" => 66,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "edad-5-formulario-de-instructores-7",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 7,
                        "operand" => "==",
                        "field_id" => 67,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "discapacidad-si-no-2-formulario-de-instructores-7",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                    ],
                ],
            ],
            [
                "label" => "Hombres mayores de 18 años sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 7,
                        "operand" => "==",
                        "field_id" => 65,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "sexo-5-formulario-de-instructores-7",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                    ],
                    [
                        "form_id" => 7,
                        "operand" => ">=",
                        "field_id" => 66,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "edad-5-formulario-de-instructores-7",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 7,
                        "operand" => "==",
                        "field_id" => 67,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "discapacidad-si-no-2-formulario-de-instructores-7",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                    ],
                ],
            ],
            [
                "label" => "Mujeres mayores de 18 años sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 7,
                        "operand" => "==",
                        "field_id" => 65,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "sexo-5-formulario-de-instructores-7",
                        "field_type" => "select",
                        "field_value" => [
                            "f-2",
                        ],
                    ],
                    [
                        "form_id" => 7,
                        "operand" => ">=",
                        "field_id" => 66,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "edad-5-formulario-de-instructores-7",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 7,
                        "operand" => "==",
                        "field_id" => 67,
                        "form_slug" => "formulario-de-instructores",
                        "field_slug" => "discapacidad-si-no-2-formulario-de-instructores-7",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                    ],
                ],
            ],
        ];

        $data = [
            [
                    'project_name' => 'P-4211',
                    'project_duration' => 4,
                    'project_start_date' => '2021-01-01',
                    'global_goal' => 7200,
                    'programs' => [
                        ['program_name' => 'Atención temprana 01.04', 'form_id' => 1],
                        ['program_name' => 'Inclusión Educativa 02.01', 'form_id' => 1],
                        ['program_name' => 'Apoyo a Padres de Familia 02.02', 'form_id' => 1],
                        ['program_name' => 'Capacitación a Docentes 02.03', 'form_id' => 5],
                        ['program_name' => 'Reuniones Bimensuales 02.04', 'form_id' => 1],
                        ['program_name' => 'Curso de Instructores 02.06', 'form_id' => 7],
                        ['program_name' => 'Capacitación a PCD y fam 02.07', 'form_id' => 7],
                        ['program_name' => 'Seminario derechos humanos 2.08', 'form_id' => 7],
                        ['program_name' => 'Encuentro con Lideres 03.01', 'form_id' => 7],
                        ['program_name' => 'Iniciativa de guia 03.02', 'form_id' => 7],
                        ['program_name' => 'Acciones de concientizac 03.04', 'form_id' => 7],
                        ['program_name' => 'Congresos 03.06', 'form_id' => 7],
                        ['program_name' => 'UNAN y Normales 04.01', 'form_id' => 7],
                        ['program_name' => 'Normalistas 04.02', 'form_id' => 7],
                        ['program_name' => 'Seminario Ley 675 04.03', 'form_id' => 7],
                        ['program_name' => 'Curso Lenguaje de señas 04.04', 'form_id' => 7],
                        ['program_name' => 'intercambio de Experiencia 04.05', 'form_id' => 7],

                    ],
                    'goals' => [
                        [
                            'goal_description' => 'Al final del proyecto, unos 500 niños con deficiencias en su desarrollo psicomotor se matriculan en escuelas primarias regulares, guarderías comunitarias o centros preescolares al año.',
                            'program_id' => 1,
                            'goal_target' => 500,
                            'conditions' => $form_1_conditions
                        ],
                        [
                            'goal_description' => 'Al final del proyecto, al menos 1.000 niños y jóvenes con discapacidad tendrán un plan de estudios flexible, medidas de accesibilidad y planes de aprendizaje individuales que permitirán su participación y progreso en las escuelas ordinarias.',
                            'program_id' => 2,
                            'goal_target' => 1000,
                            'conditions' => $form_1_conditions
                        ],
                        [
                            'goal_description' => 'Al final del proyecto, al menos 1.000 niños y jóvenes discapacitados contarán con el apoyo adecuado en su trayectoria escolar por parte de sus familias, que previamente han recibido formación periódica en eventos para padres.',
                            'program_id' => 3,
                            'goal_target' => 1000,
                            'conditions' => $form_1_conditions
                        ],
                        [
                            'goal_description' => 'Sesiones de sensibilización e información sobre la inclusión educativa con profesores de la escuela pública. ',
                            'program_id' => 4,
                            'goal_target' => 560,
                            'conditions' => $form_5_conditions
                        ],
                        [
                            'goal_description' => 'Reuniones con organizaciones de personas con discapacidad y familias de niños discapacidad, docentes, instituciones públicas y privadas que acompañan el proceso de inclusión educativa.',
                            'program_id' => 5,
                            'goal_target' => 480,
                            'conditions' => $form_1_conditions
                        ],
                        [
                            'goal_description' => 'Formación de personas con discapacidad auditiva para que se conviertan en formadores certificados en idioma de señas nicaragüense.',
                            'program_id' => 6,
                            'goal_target' => 37,
                            'conditions' => $form_7_conditions
                        ],
                        [
                            'goal_description' => 'Cursos de sensibilización para familias y personas con discapacidad sobre la inclusión.',
                            'program_id' => 7,
                            'goal_target' => 480,
                            'conditions' => $form_7_conditions
                        ],
                        [
                            'goal_description' => 'Seminarios de motivación e información para personas con discapacidad sobre sus derechos de inclusión en la educación y el empleo.',
                            'program_id' => 8,
                            'goal_target' => 130,
                            'conditions' => $form_7_conditions
                        ],
                        [
                            'goal_description' => '3.1 Reuniones de los órganos de gobierno con las organizaciones locales de personas con discapacidad para coordinar sus posiciones.',
                            'program_id' => 9,
                            'goal_target' => 120,
                            'conditions' => $form_7_conditions
                        ],
                        [
                            'goal_description' => 'Reuniones de instituciones educativas nacionales con organizaciones de personas con discapacidad sobre el enfoque de la formación del profesorado.',
                            'program_id' => 10,
                            'goal_target' => 120,
                            'conditions' => $form_7_conditions
                        ],
                        [
                            'goal_description' => '3.4 Sesiones de sensibilización e información para los estudiantes de las escuelas regulares, los profesores y los representantes de la comunidad local sobre el tema de la inclusión educativa.',
                            'program_id' => 11,
                            'goal_target' => 324,
                            'conditions' => $form_7_conditions
                        ],
                        [
                            'goal_description' => '3.6 Congresos nacionales de educación.',
                            'program_id' => 12,
                            'goal_target' => 150,
                            'conditions' => $form_7_conditions
                        ],
                        [
                            'goal_description' => '4.1 Eventos de motivación e información para profesores de la Facultad de Educación de la Universidad de Managua y de ocho colegios técnicos sobre el derecho humano a la educación.',
                            'program_id' => 13,
                            'goal_target' => 560,
                            'conditions' => $form_7_conditions
                        ],
                        [
                            'goal_description' => '4.2 Al menos 1.920 estudiantes de magisterio y profesores universitarios son formados y sensibilizados en métodos pedagógicos orientados a la práctica para atender a niños y jóvenes con discapacidades',
                            'program_id' => 14,
                            'goal_target' => 1920,
                            'conditions' => $form_7_conditions
                        ],
                        [
                            'goal_description' => '4.3 Seminarios de formación y sensibilización para los profesores de los centros educativos estatales sobre la situación especial de las personas con discapacidad auditiva.',
                            'program_id' => 15,
                            'goal_target' => 80,
                            'conditions' => $form_7_conditions
                        ],
                        [
                            'goal_description' => '4.4 Cursos de lengua de señas para 20 profesores de centros educativos públicos.',
                            'program_id' => 16,
                            'goal_target' => 120,
                            'conditions' => $form_7_conditions
                        ],
                        [
                            'goal_description' => '4.5 Intercambio de experiencias entre profesores de centros educativos públicos sobre la inclusión de niños y jóvenes con discapacidad.',
                            'program_id' => 17,
                            'goal_target' => 140,
                            'conditions' => $form_7_conditions
                        ]
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

            collect($project['goals'])->each(function ($goal) use($proj){
                $proj->goals()->create([
                    'goal_description' => $goal['goal_description'],
                    'goal_target' => $goal['goal_target'],
                    'program_id' => $goal['program_id'],
                    'conditions' => $goal['conditions']
                ]);
            });

        });

    }
}

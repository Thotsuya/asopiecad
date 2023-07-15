<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GoalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $conditions = [
            [
                "label" => "Niños menores de 18 años con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 10,
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
                        "form_id" => 10,
                        "operand" => "<",
                        "field_id" => 3,
                        "form_slug" => "formulario-de-registro-1",
                        "field_slug" => "edad-formulario-de-registro-1-1",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 10,
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
                        "form_id" => 10,
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
                        "form_id" => 10,
                        "operand" => "<",
                        "field_id" => 3,
                        "form_slug" => "formulario-de-registro-1",
                        "field_slug" => "edad-formulario-de-registro-1-1",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 10,
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
                        "form_id" => 10,
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
                        "form_id" => 10,
                        "operand" => ">=",
                        "field_id" => 3,
                        "form_slug" => "formulario-de-registro-1",
                        "field_slug" => "edad-formulario-de-registro-1-1",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 10,
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
                        "form_id" => 10,
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
                        "form_id" => 10,
                        "operand" => ">=",
                        "field_id" => 3,
                        "form_slug" => "formulario-de-registro-1",
                        "field_slug" => "edad-formulario-de-registro-1-1",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 10,
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
                        "form_id" => 10,
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
                        "form_id" => 10,
                        "operand" => "<",
                        "field_id" => 3,
                        "form_slug" => "formulario-de-registro-1",
                        "field_slug" => "edad-formulario-de-registro-1-1",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 10,
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
                        "form_id" => 10,
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
                        "form_id" => 10,
                        "operand" => "<",
                        "field_id" => 3,
                        "form_slug" => "formulario-de-registro-1",
                        "field_slug" => "edad-formulario-de-registro-1-1",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 10,
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
                        "form_id" => 10,
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
                        "form_id" => 10,
                        "operand" => ">=",
                        "field_id" => 3,
                        "form_slug" => "formulario-de-registro-1",
                        "field_slug" => "edad-formulario-de-registro-1-1",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 10,
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
                        "form_id" => 10,
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
                        "form_id" => 10,
                        "operand" => ">=",
                        "field_id" => 3,
                        "form_slug" => "formulario-de-registro-1",
                        "field_slug" => "edad-formulario-de-registro-1-1",
                        "field_type" => "number",
                        "field_value" => "18",
                    ],
                    [
                        "form_id" => 10,
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

    }
}

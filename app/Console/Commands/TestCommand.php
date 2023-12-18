<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class TestCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asopiecad:test-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $goal =  [
            [
                "label" => "NiÃƒÂ±os menores de 18 aÃƒÂ±os con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => "<",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "NiÃƒÂ±as menores de 18 aÃƒÂ±os con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "f-2",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => "<",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "Hombres mayores de 18 aÃƒÂ±os con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => ">=",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "Mujeres mayores de 18 aÃƒÂ±os con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "f-2",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => ">=",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "NiÃƒÂ±os menores de 18 aÃƒÂ±os sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => "<",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "NiÃƒÂ±as menores de 18 aÃƒÂ±os sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "f-2",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => "<",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "Hombres mayores de 18 aÃƒÂ±os sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => ">=",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "Mujeres mayores de 18 aÃƒÂ±os sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "f-2",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => ">=",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "NiÃƒÆ’Ã‚Â±os menores de 18 aÃƒÆ’Ã‚Â±os con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => "<",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "NiÃƒÆ’Ã‚Â±as menores de 18 aÃƒÆ’Ã‚Â±os con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "f-2",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => "<",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "Hombres mayores de 18 aÃƒÆ’Ã‚Â±os con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => ">=",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "Mujeres mayores de 18 aÃƒÆ’Ã‚Â±os con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "f-2",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => ">=",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "NiÃƒÆ’Ã‚Â±os menores de 18 aÃƒÆ’Ã‚Â±os sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => "<",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "NiÃƒÆ’Ã‚Â±as menores de 18 aÃƒÆ’Ã‚Â±os sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "f-2",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => "<",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "Hombres mayores de 18 aÃƒÆ’Ã‚Â±os sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => ">=",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "Mujeres mayores de 18 aÃƒÆ’Ã‚Â±os sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "f-2",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => ">=",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "NiÃ±os menores de 18 aÃ±os con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => "<",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 109,
                        "field_slug" => "post-quirurgica-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "NiÃ±as menores de 18 aÃ±os con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => null,
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => "<",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 109,
                        "field_slug" => "post-quirurgica-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "Hombres mayores de 18 aÃ±os con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => ">=",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 109,
                        "field_slug" => "post-quirurgica-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "Mujeres mayores de 18 aÃ±os con discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "f-2",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => ">=",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 109,
                        "field_slug" => "post-quirurgica-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "NiÃ±os menores de 18 aÃ±os sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => "<",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 109,
                        "field_slug" => "post-quirurgica-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "NiÃ±as menores de 18 aÃ±os sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "f-2",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => "<",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 109,
                        "field_slug" => "post-quirurgica-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "Hombres mayores de 18 aÃ±os sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "m-1",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => ">=",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 109,
                        "field_slug" => "post-quirurgica-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
            [
                "label" => "Mujeres mayores de 18 aÃ±os sin discapacidad",
                "conditions" => [
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 94,
                        "field_slug" => "sexo-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "f-2",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 95,
                        "field_slug" => "edad-7-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "text",
                        "field_value" => "18",
                        "operand" => ">=",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 96,
                        "field_slug" => "discapacidad-si-no-3-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "No-2",
                        ],
                        "operand" => "==",
                    ],
                    [
                        "form_id" => 9,
                        "form_slug" => "formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular",
                        "field_id" => 109,
                        "field_slug" => "post-quirurgica-formulario-de-consultas-cirugias-y-visitas-desde-los-centros-inclusivos-de-atencion-ocular-9",
                        "field_type" => "select",
                        "field_value" => [
                            "si-1",
                        ],
                        "operand" => "==",
                    ],
                ],
            ],
        ];

        //Encode the array into a JSON string.
        $encodedString = json_encode($goal);

        //Save the JSON string to a text file.
        file_put_contents('json.txt', $encodedString);

        return 0;
    }
}

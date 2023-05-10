<?php

namespace Database\Seeders;

use App\Models\Form;
use Illuminate\Database\Seeder;

class FormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $disabilities = [#4247
            "name"     => "Tipo de Discapacidad o alteración en el desarrollo",
            "slug"     => "tipo-de-discapacidad-o-alteracion-en-el-desarrollo",
            "type"     => "select multiple",
            "required" => true,
            "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
            "options"  => [
                [
                    "id"       => 1,
                    "name"     => "Sin Discapacidad",
                    "value"    => "sin-discapacidad-1",
                    "order"    => 1,
                    "editMode" => false,
                ],
                [
                    "id"       => 2,
                    "name"     => "Sindrome Kabiki",
                    "value"    => "sindrome-kabiki-2",
                    "order"    => 2,
                    "editMode" => false,
                ],
                [
                    "id"       => 3,
                    "name"     => "Intelectual",
                    "value"    => "intelectual-3",
                    "order"    => 3,
                    "editMode" => false,
                ],
                [
                    "id"       => 4,
                    "name"     => "Visual",
                    "value"    => "visual-4",
                    "order"    => 4,
                    "editMode" => false,
                ],
                [
                    "id"       => 5,
                    "name"     => "Parálisis Cerebral",
                    "value"    => "paralisis-cerebral-5",
                    "order"    => 5,
                    "editMode" => false,
                ],
                [
                    "id"       => 6,
                    "name"     => "Auditiva",
                    "value"    => "auditiva-6",
                    "order"    => 6,
                    "editMode" => false,
                ],
                [
                    "id"       => 7,
                    "name"     => "Motora",
                    "value"    => "motora-7",
                    "order"    => 7,
                    "editMode" => false,
                ],
                [
                    "id"       => 8,
                    "name"     => "Psicosocial",
                    "value"    => "psicosocial-8",
                    "order"    => 8,
                    "editMode" => false,
                ],
                [
                    "id"       => 9,
                    "name"     => "Fisico motora",
                    "value"    => "fisico-motora-9",
                    "order"    => 9,
                    "editMode" => false,
                ],
                [
                    "id"       => 10,
                    "name"     => "Déficit de atención",
                    "value"    => "deficit-de-atencion--10",
                    "order"    => 10,
                    "editMode" => false,
                ],
                [
                    "id"       => 11,
                    "name"     => "Parálisis Cerebral Infantil",
                    "value"    => "paralisis-cerebral-infantil-11",
                    "order"    => 11,
                    "editMode" => false,
                ],
                [
                    "id"       => 12,
                    "name"     => "Alteración En el desarrollo",
                    "value"    => "alteracion-en-el-desarrollo-12",
                    "order"    => 12,
                    "editMode" => false,
                ],
                [
                    "id"       => 13,
                    "name"     => "Retardo en el Desarrollo Sicomotor",
                    "value"    => "retardo-en-el-desarrollo-sicomotor-13",
                    "order"    => 13,
                    "editMode" => false,
                ],
                [
                    "id"       => 14,
                    "name"     => "Paladar Hendido",
                    "value"    => "paladar-hendido-14",
                    "order"    => 14,
                    "editMode" => false,
                ],
                [
                    "id"       => 15,
                    "name"     => "Pie equinovaro",
                    "value"    => "pie-equinovaro-15",
                    "order"    => 15,
                    "editMode" => false,
                ],
                [
                    "id"       => 16,
                    "name"     => "Microcefalia Severa",
                    "value"    => "microcefalia-severa-16",
                    "order"    => 16,
                    "editMode" => false,
                ],
                [
                    "id"       => 17,
                    "name"     => "Trastorno en el Lenguaje",
                    "value"    => "trastorno-en-el-lenguaje-17",
                    "order"    => 17,
                    "editMode" => false,
                ],
                [
                    "id"       => 18,
                    "name"     => "Intelectual Leve",
                    "value"    => "intelectual-leve-18",
                    "order"    => 18,
                    "editMode" => false,
                ],
                [
                    "id"       => 19,
                    "name"     => "Microcefalia",
                    "value"    => "microcefalia-19",
                    "order"    => 19,
                    "editMode" => false,
                ],
                [
                    "id"       => 20,
                    "name"     => "Sindrome de Down",
                    "value"    => "sindrome-de-down-20",
                    "order"    => 20,
                    "editMode" => false,
                ],
                [
                    "id"       => 21,
                    "name"     => "Autismo",
                    "value"    => "autismo-21",
                    "order"    => 21,
                    "editMode" => false,
                ],
                [
                    "id"       => 22,
                    "name"     => "Hipotoridome congénito",
                    "value"    => "hipotoridome-congenito-22",
                    "order"    => 22,
                    "editMode" => false,
                ],
                [
                    "id"       => 23,
                    "name"     => "Trastorno por déficit de atención e hiperactividad (TDAH)",
                    "value"    => "trastorno-por-deficit-de-atencion-e-hiperactividad-tdah-23",
                    "order"    => 23,
                    "editMode" => false,
                ],
                [
                    "id"       => 24,
                    "name"     => "Esclerosis múltiple",
                    "value"    => "esclerosis-multiple-24",
                    "order"    => 24,
                    "editMode" => false,
                ],
                [
                    "id"       => 25,
                    "name"     => "Fibrosis quística",
                    "value"    => "fibrosis-quistica-25",
                    "order"    => 25,
                    "editMode" => false,
                ],
                [
                    "id"       => 26,
                    "name"     => "Enfermedad de Huntington",
                    "value"    => "enfermedad-de-huntington-26",
                    "order"    => 26,
                    "editMode" => false,
                ],
                [
                    "id"       => 27,
                    "name"     => "Síndrome de Asperger",
                    "value"    => "sindrome-de-asperger-27",
                    "order"    => 27,
                    "editMode" => false,
                ],
                [
                    "id"       => 28,
                    "name"     => "Síndrome de Rett",
                    "value"    => "sindrome-de-rett-28",
                    "order"    => 28,
                    "editMode" => false,
                ],
                [
                    "id"       => 29,
                    "name"     => "Síndrome de Prader-Willi",
                    "value"    => "sindrome-de-prader-willi-29",
                    "order"    => 29,
                    "editMode" => false,
                ],
                [
                    "id"       => 30,
                    "name"     => "Síndrome de Angelman",
                    "value"    => "sindrome-de-angelman-30",
                    "order"    => 30,
                    "editMode" => false,
                ],
                [
                    "id"       => 31,
                    "name"     => "Vulnerable",
                    "value"    => "vulnerable-31",
                    "order"    => 31,
                    "editMode" => false,
                ],
                [
                    "id"       => 32,
                    "name"     => "Paralisis Cerebral Infantil",
                    "value"    => "paralisis-cerebral-infantil-32",
                    "order"    => 32,
                    "editMode" => false,
                ],
                [
                    "id"       => 33,
                    "name"     => "Paralisis Cerebral",
                    "value"    => "paralisis-cerebral-33",
                    "order"    => 33,
                    "editMode" => false,
                ]
            ],

        ];
        $departments = [
            "name"     => "Departamentos",
            "type"     => "select",
            "required" => true,
            "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
            "options"  => [
                [
                    "id"       => 1,
                    "name"     => "Chinandega",
                    "value"    => "chinandega-1",
                    "order"    => 1,
                    "editMode" => false,
                ],
                [
                    "id"       => 2,
                    "name"     => "León",
                    "value"    => "leon-2",
                    "order"    => 2,
                    "editMode" => false,
                ],
                [
                    "id"       => 3,
                    "name"     => "Managua",
                    "value"    => "managua-3",
                    "order"    => 3,
                    "editMode" => false,
                ],
                [
                    "id"       => 4,
                    "name"     => "Masaya",
                    "value"    => "masaya-4",
                    "order"    => 4,
                    "editMode" => false,
                ],
                [
                    "id"       => 5,
                    "name"     => "Carazo",
                    "value"    => "carazo-5",
                    "order"    => 5,
                    "editMode" => false,
                ],
                [
                    "id"       => 6,
                    "name"     => "Granada",
                    "value"    => "granada-6",
                    "order"    => 6,
                    "editMode" => false,
                ],
                [
                    "id"       => 7,
                    "name"     => "Rivas",
                    "value"    => "rivas-7",
                    "order"    => 7,
                    "editMode" => false,
                ],
                [
                    "id"       => 8,
                    "name"     => "Nueva Segovia",
                    "value"    => "nueva-segovia-8",
                    "order"    => 8,
                    "editMode" => false,
                ],
                [
                    "id"       => 9,
                    "name"     => "Madriz",
                    "value"    => "madriz-9",
                    "order"    => 9,
                    "editMode" => false,
                ],
                [
                    "id"       => 10,
                    "name"     => "Estelí",
                    "value"    => "esteli-10",
                    "order"    => 10,
                    "editMode" => false,
                ],
                [
                    "id"       => 11,
                    "name"     => "Jinotega",
                    "value"    => "jinotega-11",
                    "order"    => 11,
                    "editMode" => false,
                ]
                ,
                [
                    "id"       => 12,
                    "name"     => "Matagalpa",
                    "value"    => "matagalpa-12",
                    "order"    => 12,
                    "editMode" => false,
                ],
                [
                    "id"       => 13,
                    "name"     => "Boaco",
                    "value"    => "boaco-13",
                    "order"    => 13,
                    "editMode" => false,
                ],
                [
                    "id"       => 14,
                    "name"     => "Chontales",
                    "value"    => "chontales-14",
                    "order"    => 14,
                    "editMode" => false,
                ],
                [
                    "id"       => 15,
                    "name"     => "Río San Juan",
                    "value"    => "rio-san-juan-15",
                    "order"    => 15,
                    "editMode" => false,
                ],
                [
                    "id"       => 16,
                    "name"     => "RAAS",
                    "value"    => "raas-16",
                    "order"    => 16,
                    "editMode" => false,
                ],
                [
                    "id"       => 17,
                    "name"     => "RAAN",
                    "value"    => "raan-17",
                    "order"    => 17,
                    "editMode" => false,
                ],
            ],
        ];

        $forms = [
            [
                'form_name' => 'Formulario de Registro 1',
                'tabs'      => [
                    [
                        'tab_name' => 'Información General',
                        'fields'   => [
                            [
                                "name"     => "Nombres y Apellidos",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Sexo",
                                "type"     => "select",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [
                                    [#4251
                                        "id"       => 1,
                                        "name"     => "M",
                                        "value"    => "m-1",
                                        "order"    => 1,
                                        "editMode" => false,
                                    ],
                                    [#4250
                                        "id"       => 2,
                                        "name"     => "F",
                                        "value"    => "f-2",
                                        "order"    => 2,
                                        "editMode" => false,
                                    ],
                                ],
                            ],
                            [#4253
                                "name"     => "Edad",
                                "type"     => "number",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            $disabilities,
                            [#4249
                                "name"     => "Fecha de Nacimiento",
                                "type"     => "date",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [#4248
                                "name"     => "Cédula de Identidad",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [#4276
                                "name"     => "Dirección",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
                                "options"  => [],
                            ],
                            [#4277
                                "name"     => "Barrio",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [#4278
                                "name"     => "Municipio",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                                "slug"     => "municipio",
                            ],
                            $departments,
                            [
                                "name"     => "Teléfono",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                                "slug"     => "telefono",
                            ],
                            [
                                "name"     => "Tutor o Responsable",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
                                "options"  => [],
                                "slug"     => "tutor-o-responsable",
                            ],
                            [
                                "name" => "Teléfono Opcional",
                                "type" => "text",
                                "required" => false,
                                "size" => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options" => [],
                            ],
                            [
                                "name"     => "Fecha de Ingreso",
                                "type"     => "date",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                        ]
                    ]
                ]
            ],
            [
                'form_name' => 'Formulario de Registro 2',
                'tabs'      => [
                    [
                        'tab_name' => 'Información General',
                        'fields'   => [
                            [
                                "name"     => "Fecha de Ingreso",
                                "type"     => "date",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Nombres y Apellidos",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Fecha de Nacimiento",
                                "type"     => "date",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Cédula de Identidad",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Sexo",
                                "type"     => "select",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [
                                    [#4251
                                        "id"       => 1,
                                        "name"     => "M",
                                        "value"    => "m-1",
                                        "order"    => 1,
                                        "editMode" => false,
                                    ],
                                    [#4250
                                        "id"       => 2,
                                        "name"     => "F",
                                        "value"    => "f-2",
                                        "order"    => 2,
                                        "editMode" => false,
                                    ],
                                ],
                            ],
                            [
                                "name"     => "Edad",
                                "type"     => "number",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Teléfono Opcional",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            $disabilities,
                            [
                                "name"     => "Tutor o Responsable",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
                                "options"  => [],
                            ],

                        ]
                    ]
                ]
            ],
            [
                'form_name' => 'Formulario de Registro 3',
                'tabs'      => [
                    [
                        'tab_name' => 'Información General',
                        'fields'   => [
                            [
                                "name"     => "Nombres y Apellidos",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Sexo",
                                "type"     => "select",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "tab_id"   => "1",
                                "options"  => [
                                    [#4251
                                        "id"       => 1,
                                        "name"     => "M",
                                        "value"    => "m-1",
                                        "order"    => 1,
                                        "editMode" => false,
                                    ],
                                    [#4250
                                        "id"       => 2,
                                        "name"     => "F",
                                        "value"    => "f-2",
                                        "order"    => 2,
                                        "editMode" => false,
                                    ],
                                ],
                                "slug"     => "sexo",
                            ],
                            [#4253
                                "name"     => "Edad",
                                "type"     => "number",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            $disabilities,
                            [#4249
                                "name"     => "Fecha de Nacimiento",
                                "type"     => "date",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [#4248
                                "name"     => "Cédula de Identidad",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [#4276
                                "name"     => "Dirección",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
                                "options"  => [],
                            ],
                            [#4277
                                "name"     => "Barrio",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [#4278
                                "name"     => "Municipio",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            $departments,
                            [
                                "name"     => "Teléfono",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Tutor o Responsable",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Plan de actividad a realizar",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Fecha de Ingreso",
                                "type"     => "date",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                        ]
                    ]
                ]
            ],
            [
                'form_name' => 'Formulario de Registro 4',
                'tabs'      => [
                    [
                        'tab_name' => 'Información General',
                        'fields'   => [
                            [
                                "name"     => "Nombres y Apellidos",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
                                "options"  => [],
                            ],
                            [#4248
                                "name"     => "Cédula de Identidad",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [#4276
                                "name"     => "Dirección",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Celular",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                        ]
                    ]
                ]
            ],
            [
                'form_name' => 'Formulario de Capacitación a docentes',
                'tabs'      => [
                    [
                        'tab_name' => 'Información General',
                        'fields'   => [
                            [
                                "name"     => "Nombres y Apellidos",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Sexo",
                                "type"     => "select",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [
                                    [#4251
                                        "id"       => 1,
                                        "name"     => "M",
                                        "value"    => "m-1",
                                        "order"    => 1,
                                        "editMode" => false,
                                    ],
                                    [#4250
                                        "id"       => 2,
                                        "name"     => "F",
                                        "value"    => "f-2",
                                        "order"    => 2,
                                        "editMode" => false,
                                    ],
                                ],
                            ],
                            [#4253
                                "name"     => "Edad",
                                "type"     => "number",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Discapacidad ( Si / No )",
                                "type"     => "select",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-12",
                                "options"  => [
                                    [#4251
                                        "id"       => 1,
                                        "name"     => "Si",
                                        "value"    => "si-1",
                                        "order"    => 1,
                                        "editMode" => false,
                                    ],
                                    [#4250
                                        "id"       => 2,
                                        "name"     => "No",
                                        "value"    => "No-2",
                                        "order"    => 2,
                                        "editMode" => false,
                                    ],
                                ],
                            ],
                            [#4249
                                "name"     => "Fecha de Nacimiento",
                                "type"     => "date",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [#4248
                                "name"     => "Cédula de Identidad",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [#4276
                                "name"     => "Tema de la capacitación",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
                                "options"  => [],
                            ],
                            [#4277
                                "name"     => "Perfil Docente. Asesor Pedagógico. Educadora. Administrativo",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-6",
                                "options"  => [],
                            ],
                            [#4278
                                "name"     => "Municipio",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                                "slug"     => "municipio",
                            ],
                            $departments,
                            [
                                "name"     => "Teléfono",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                                "slug"     => "telefono",
                            ],
                        ]
                    ]
                ]
            ],
            [
                'form_name' => 'Formulario de Reuniones Bimensuales',
                'tabs'      => [
                    [
                        'tab_name' => 'Información General',
                        'fields'   => [
                            [
                                "name"     => "Nombres y Apellidos",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Sexo",
                                "type"     => "select",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [
                                    [#4251
                                        "id"       => 1,
                                        "name"     => "M",
                                        "value"    => "m-1",
                                        "order"    => 1,
                                        "editMode" => false,
                                    ],
                                    [#4250
                                        "id"       => 2,
                                        "name"     => "F",
                                        "value"    => "f-2",
                                        "order"    => 2,
                                        "editMode" => false,
                                    ],
                                ],
                            ],
                            [#4253
                                "name"     => "Edad",
                                "type"     => "number",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Discapacidad ( Si / No )",
                                "type"     => "select",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-12",
                                "options"  => [
                                    [#4251
                                        "id"       => 1,
                                        "name"     => "Si",
                                        "value"    => "si-1",
                                        "order"    => 1,
                                        "editMode" => false,
                                    ],
                                    [#4250
                                        "id"       => 2,
                                        "name"     => "No",
                                        "value"    => "No-2",
                                        "order"    => 2,
                                        "editMode" => false,
                                    ],
                                ],
                            ],
                            [#4249
                                "name"     => "Fecha de Nacimiento",
                                "type"     => "date",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [#4248
                                "name"     => "Cédula de Identidad",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [#4276
                                "name"     => "Tema de la capacitación",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
                                "options"  => [],
                            ],
                            [#4277
                                "name"     => "Perfil Docente. Asesor Pedagógico. Educadora. Administrativo",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-6",
                                "options"  => [],
                            ],
                            [#4278
                                "name"     => "Municipio",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                                "slug"     => "municipio",
                            ],
                            $departments,
                            [
                                "name"     => "Teléfono",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                                "slug"     => "telefono",
                            ],
                        ]
                    ]
                ]
            ],
            [
                'form_name' => 'Formulario de Instructores',
                'tabs'      => [
                    [
                        'tab_name' => 'Información General',
                        'fields'   => [
                            [
                                "name"     => "Nombres y Apellidos",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Sexo",
                                "type"     => "select",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [
                                    [#4251
                                        "id"       => 1,
                                        "name"     => "M",
                                        "value"    => "m-1",
                                        "order"    => 1,
                                        "editMode" => false,
                                    ],
                                    [#4250
                                        "id"       => 2,
                                        "name"     => "F",
                                        "value"    => "f-2",
                                        "order"    => 2,
                                        "editMode" => false,
                                    ],
                                ],
                            ],
                            [#4253
                                "name"     => "Edad",
                                "type"     => "number",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Discapacidad ( Si / No )",
                                "type"     => "select",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-12",
                                "options"  => [
                                    [#4251
                                        "id"       => 1,
                                        "name"     => "Si",
                                        "value"    => "si-1",
                                        "order"    => 1,
                                        "editMode" => false,
                                    ],
                                    [#4250
                                        "id"       => 2,
                                        "name"     => "No",
                                        "value"    => "No-2",
                                        "order"    => 2,
                                        "editMode" => false,
                                    ],
                                ],
                            ],
                            $disabilities,
                            [#4249
                                "name"     => "Fecha de Nacimiento",
                                "type"     => "date",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [#4248
                                "name"     => "Cédula de Identidad",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [#4276
                                "name"     => "Organización o Institución",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
                                "options"  => [],
                            ],
                            [#4278
                                "name"     => "Municipio",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                                "slug"     => "municipio",
                            ],
                            $departments,
                            [
                                "name"     => "Teléfono",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                                "slug"     => "telefono",
                            ],
                        ]
                    ]
                ]
            ],
        ];

        collect($forms)->each(function ($form) {
            $formulario = Form::create([
                'form_name' => $form['form_name'],
            ]);

            collect($form['tabs'])->each(function ($tab) use ($formulario) {
                $tabs = $formulario->tabs()->create([
                    'tab_name' => $tab['tab_name'],
                ]);

                collect($tab['fields'])->each(function ($field) use ($tabs) {
                    $tabs->fields()->create($field);
                });
            });
        });
    }
}

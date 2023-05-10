<?php

namespace Database\Seeders;

use App\Models\Form;
use App\Models\Project;
use Illuminate\Database\Seeder;

class NewFormsSeeder extends Seeder
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
                'form_name' => 'Formulario de CONSULTAS, CIRUGÍAS Y VISITAS DESDE LOS CENTROS INCLUSIVOS DE ATENCIÓN OCULAR',
                'tabs'      => [
                    [
                        'tab_name' => 'Información General',
                        'fields'   => [
                            [
                                "name"     => "1er Nombre",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "2do Nombre",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "1er Apellido",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "2do Apellido",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
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
                                "name"     => "Dirección",
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
                                "name"     => "Primera atención",
                                "type"     => "date",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            //Consulta (subsecuente )
                            [
                                "name"     => "Consulta (subsecuente )",
                                "type"     => "date",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            //Cirugía por cataratas
                            [
                                "name"     => "Cirugía por cataratas ",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            //Otro Tipo de cirugía
                            [
                                "name"     => "Otro Tipo de cirugía ",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-6",
                                "options"  => [],
                            ],
                            //Pre quirúrgica
                            [
                                "name"     => "Pre quirúrgica ",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            //Post quirúrgica
                            [
                                "name"     => "Post quirúrgica ",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            //Referencias
                            [
                                "name"     => "Referencias ",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-6",
                                "options"  => [],
                            ],
                            //Traslados
                            [
                                "name"     => "Traslados ",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-6",
                                "options"  => [],
                            ],
                            //Visitas Comunitarias o domiciliares
                            [
                                "name"     => "Visitas Comunitarias o domiciliares ",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-6",
                                "options"  => [],
                            ],
                            //Observaciones
                            [
                                "name"     => "Observaciones ",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-12",
                                "options"  => [],
                            ],
                        ]
                    ]
                ]
            ],
            [
                'form_name' => 'Formulario CONFORMACIÓN DE UN EQUIPO COORDINADOR',
                'tabs'      => [
                    [
                        'tab_name' => 'Información General',
                        'fields'   => [
                            [
                                "name"     => "1er Nombre",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "2do Nombre",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "1er Apellido",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "2do Apellido",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
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
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
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
                            $disabilities,
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
                            $departments,
                            [#4278
                                "name"     => "Municipio",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Teléfono",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-4",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Institución u organización que representa",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-4",
                                "options"  => [],
                            ],
                            //Consulta (subsecuente )
                            [
                                "name"     => "Cargo, Función o Responsabilidad",
                                "type"     => "date",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-4",
                                "options"  => [],
                            ],
                            //Cirugía por cataratas
                            [
                                "name"     => "Observaciones ",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-12",
                                "options"  => [],
                            ],
                        ]
                    ]
                ]
            ],
            [
                'form_name' => 'Formulario REPLICA A NIVEL COMUNITARIO',
                'tabs'      => [
                    [
                        'tab_name' => 'Datos Personales',
                        'fields'   => [
                            [
                                "name"     => "1er Nombre",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "2do Nombre",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "1er Apellido",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "2do Apellido",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
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
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
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
                            $disabilities,
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
                            $departments,
                            [#4278
                                "name"     => "Municipio",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Teléfono",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-4",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Institución u organización que representa",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-4",
                                "options"  => [],
                            ],
                            //Consulta (subsecuente )
                            [
                                "name"     => "Cargo, Función o Responsabilidad",
                                "type"     => "date",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-4",
                                "options"  => [],
                            ],
                            //Cirugía por cataratas
                            [
                                "name"     => "Observaciones ",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-12",
                                "options"  => [],
                            ],
                        ]
                    ],
                    [
                        'tab_name' => 'Información del evento',
                        'fields'   => [
                            [
                                "name"     => "Tipo de Evento Capacitación/Charla",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-4 col-md-4 col-lg-4",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Nombre del Evento",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-4 col-md-4 col-lg-4",
                                "options"  => [],

                            ],
                            [
                                //Fecha de Realización del Evento
                                "name"     => "Fecha de Realización del Evento",
                                "type"     => "date",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-4 col-md-4 col-lg-4",
                                "options"  => [],
                            ],
                            [
                                //Cantidad de horas
                                "name"     => "Cantidad de horas",
                                "type"     => "number",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Certificado",
                                "type"     => "select",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
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
                            [
                                //Lugar
                                "name"     => "Lugar",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
                                "options"  => [],
                            ]
                        ]
                    ]
                ]
            ],
            [
                'form_name' => 'Formulario de REGISTRO DE TAMIZAJES (VISITAS PARA TAMIZAJES)',
                'tabs'      => [
                    [
                        'tab_name' => 'Información General',
                        'fields'   => [
                            [
                                "name"     => "1er Nombre",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "2do Nombre",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "1er Apellido",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "2do Apellido",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Sexo",
                                "type"     => "select",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
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
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
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
                                "name"     => "Dirección",
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
                            ],
                            $departments,
                            [
                                "name"     => "Teléfono",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-4 col-md-4 col-lg-4",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Agudeza Visual",
                                "type"     => "select",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-4 col-md-4 col-lg-4",
                                "options"  => [
                                    [#4251
                                        "id"       => 1,
                                        "name"     => "OD",
                                        "value"    => "OD-1",
                                        "order"    => 1,
                                        "editMode" => false,
                                    ],
                                    [#4250
                                        "id"       => 2,
                                        "name"     => "OI",
                                        "value"    => "0I-2",
                                        "order"    => 2,
                                        "editMode" => false,
                                    ],
                                ],
                            ],
                            [
                                "name"     => "Referidos",
                                "type"     => "select",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-4 col-md-4 col-lg-4",
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
                            //Observaciones
                            [
                                "name"     => "Observaciones ",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-6 col-md-4 col-lg-12",
                                "options"  => [],
                            ],
                        ]
                    ]
                ]
            ],
            [
                'form_name' => 'Formulario de VISITAS DE DETECCIÓN',
                'tabs'      => [
                    [
                        'tab_name' => 'Datos Generales',
                        'fields'   => [
                            [
                                "name"     => "1er Nombre",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "2do Nombre",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "1er Apellido",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "2do Apellido",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Sexo",
                                "type"     => "select",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
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
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
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
                                "name"     => "Dirección",
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
                            ],
                            $departments,
                            [
                                "name"     => "Teléfono",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-4 col-md-4 col-lg-4",
                                "options"  => [],
                            ],
                        ]
                    ],
                    [
                        'tab_name' => 'Información De La Visita',
                        'fields'   => [
                            [
                                "name"     => "Fecha de Visita",
                                "type"     => "date",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Propósito de la Visita",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-9 col-md-9 col-lg-9",
                                "options"  => [],
                            ],
                            [
                                //Actividades Desarrolladas
                                "name"     => "Actividades Desarrolladas",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-12 col-md-12 col-lg-12",
                                "options"  => [],
                            ],
                            [
                                //Resultados de la Visita
                                "name"     => "Resultados de la Visita",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-12 col-md-12 col-lg-12",
                                "options"  => [],
                            ]
                        ]
                    ]
                ]
            ],
            [
                'form_name' => 'Formulario de VISITAS A PERSONAS QUE PRESENTAN AGUDEZA VISUAL DESPUES DE CIRUGIAS DE CATARATAS',
                'tabs'      => [
                    [
                        'tab_name' => 'Datos Generales',
                        'fields'   => [
                            [
                                "name"     => "1er Nombre",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "2do Nombre",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "1er Apellido",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "2do Apellido",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Sexo",
                                "type"     => "select",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
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
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
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
                                "name"     => "Dirección",
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
                            ],
                            $departments,
                            [
                                "name"     => "Teléfono",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-4 col-md-4 col-lg-4",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Agudeza Visual",
                                "type"     => "select",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-4 col-md-4 col-lg-4",
                                "options"  => [
                                    [#4251
                                        "id"       => 1,
                                        "name"     => "OD",
                                        "value"    => "OD-1",
                                        "order"    => 1,
                                        "editMode" => false,
                                    ],
                                    [#4250
                                        "id"       => 2,
                                        "name"     => "OI",
                                        "value"    => "0I-2",
                                        "order"    => 2,
                                        "editMode" => false,
                                    ],
                                ],
                            ],
                        ]
                    ],
                    [
                        'tab_name' => 'Información De La Visita',
                        'fields'   => [
                            [
                                "name"     => "Fecha de Visita",
                                "type"     => "date",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Propósito de la Visita",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-9 col-md-9 col-lg-9",
                                "options"  => [],
                            ],
                            [
                                //Actividades Desarrolladas
                                "name"     => "Actividades Desarrolladas",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-12 col-md-12 col-lg-12",
                                "options"  => [],
                            ],
                            [
                                //Resultados de la Visita
                                "name"     => "Resultados de la Visita",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-12 col-md-12 col-lg-12",
                                "options"  => [],
                            ]
                        ]
                    ]
                ]
            ],
            [
                'form_name' => 'Formulario de REUNIONES CON EL EQUIPO COORDINADOR DEPARTAMENTAL',
                'tabs'      => [
                    [
                        'tab_name' => 'Datos Generales',
                        'fields'   => [
                            [
                                "name"     => "1er Nombre",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "2do Nombre",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "1er Apellido",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "2do Apellido",
                                "type"     => "text",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Sexo",
                                "type"     => "select",
                                "required" => true,
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
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
                                "size"     => "col-xs-12 col-sm-6 col-md-6 col-lg-6",
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
                                "name"     => "Dirección",
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
                            ],
                            $departments,
                            [
                                "name"     => "Teléfono",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-4 col-md-4 col-lg-4",
                                "options"  => [],
                            ],
                            [
                                //Cargo, responsabilidad o Rol
                                "name"     => "Cargo, responsabilidad o Rol",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-12 col-md-12 col-lg-12",
                                "options"  => [],
                            ]
                        ]
                    ],
                    [
                        'tab_name' => 'Información De La Reunión',
                        'fields'   => [
                            [
                                "name"     => "Fecha de la Reunión",
                                "type"     => "date",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                //Responsable de la Reunión
                                "name"     => "Responsable de la Reunión",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-9 col-md-9 col-lg-9",
                                "options"  => [],
                            ],
                            [
                                //Cargo o responsabilidad
                                "name"     => "Cargo o responsabilidad",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-3 col-md-3 col-lg-3",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Propósito de la Reunión",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-9 col-md-9 col-lg-9",
                                "options"  => [],
                            ],
                            [
                                //Actividades Desarrolladas
                                "name"     => "Actividades Desarrolladas",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-12 col-md-12 col-lg-12",
                                "options"  => [],
                            ],
                            [
                                //Resultados de la Visita
                                "name"     => "Resultados",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-12 col-md-12 col-lg-12",
                                "options"  => [],
                            ],
                            [
                                "name"     => "Observaciones",
                                "type"     => "text",
                                "required" => false,
                                "size"     => "col-xs-12 col-sm-12 col-md-12 col-lg-12",
                                "options"  => [],
                            ]
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


        $project_data = [
            'project_name'        => ' 4353-MYP-CBM',
            'project_description' => 'Programa de Salud Ocular Comunitaria y DIBC en Nicaragua',
            'project_duration'    => 4,
            'project_start_date'  => now(),
            'global_goal'         => 15750,
            'programs'            => [
                [
                    'program_name' => 'CONSULTAS, CIRUGÍAS Y VISITAS DESDE LOS CENTROS INCLUSIVOS DE ATENCIÓN OCULAR',
                    'form_id'      => 8 //Change to 9
                ],
                ['program_name' => 'CONFORMACIÓN DE UN EQUIPO COORDINADOR', 'form_id' => 9],  //Change to 10
                ['program_name' => 'CONFORMACIÓN DE UN EQUIPO COORDINADOR DEPARTAMENTAL', 'form_id' => 9],  //Change to 10

                ['program_name' => 'CAPACITACIÓN A EQUIPO NACIONAL', 'form_id' => 10], //Change to 11
                ['program_name' => 'REPLICA A NIVEL COMUNITARIO', 'form_id' => 10],//Change to 11
                ['program_name' => 'CHARLAS DE CONCIENTIZACIÓN', 'form_id' => 10], //Change to 11

                ['program_name' => 'REGISTRO DE TAMIZAJES (VISITAS PARA TAMIZAJES)', 'form_id' => 11], //Change to 12

                ['program_name' => 'VISITAS DE DETECCIÓN', 'form_id' => 12], //Change to 13
                ['program_name' => 'VISITAS DE ACOMPAÑAMIENTO Y SEGUIMIENTO', 'form_id' => 12], //Change to 13
                ['program_name' => 'VISITAS DE SEGUIMIENTO Y ACOMPAÑAMIENTO PRE Y POST QUIRURGICA', 'form_id' => 12], //Change to 13
                ['program_name' => 'VISITAS DE ACOMPAÑAMIENTO PARA GARANTIZAR QUE LOS SERVICIOS DE SALUD SON INCLUSIVOS', 'form_id' => 12], //Change to 13

                ['program_name' => 'VISITAS A PERSONAS QUE PRESENTAN AGUDEZA VISUAL DESPUES DE CIRUGIAS DE CATARATAS', 'form_id' => 13], //Chang
                //e to 14
                ['program_name' => 'REUNIONES CON EL EQUIPO COORDINADOR DEPARTAMENTAL', 'form_id' => 14], //Change to 15
                ['program_name' => 'REUNIONES DE PLANIFICACION, SEGUIMIENTO Y COORDINACION DE ACTIVIDADES PROGRAMADAS DEL PROYECTO (EQUIPO TÉCNICO DEL PROYECTO)', 'form_id' => 14], //Change to 11

                ['program_name' => 'VISITAS DE ACOMPAÑAMIENTO A LAS ACTIVIDADES DEL PROYECTO', 'form_id' => 12] //Change to 11
            ],
        ];


        $project = Project::create([
            'project_name'        => $project_data['project_name'],
            'project_description' => $project_data['project_description'],
            'project_duration'    => $project_data['project_duration'],
            'project_start_date'  => $project_data['project_start_date'],
            'global_goal'         => $project_data['global_goal'],
        ]);

        collect($project_data['programs'])->each(function ($program) use ($project) {
            $prog = $project->programs()->create(['program_name' => $program['program_name']]);
            $prog->forms()->attach($program['form_id'] + 1);
        });
    }
}

<?php

namespace Database\Seeders;

use App\Models\Form;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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

        $fields = '[{"tab_id":1,"tab_name":"General","tab_slug":"general","editMode":false,"order":1,"fields":[{"name":"Fecha de Ingreso","type":"date","required":true,"size":"col-xs-12 col-sm-6 col-md-4 col-lg-3","tab_id":"1","options":[],"slug":"fecha-de-ingreso","id":1},{"name":"Nombre y Apellido completo","type":"text","required":true,"size":"col-xs-12 col-sm-6 col-md-6 col-lg-6","tab_id":"1","options":[],"slug":"nombre-y-apellido-completo","id":2},{"name":"Sexo","type":"select","required":true,"size":"col-xs-12 col-sm-6 col-md-4 col-lg-3","tab_id":"1","options":[{"id":1,"name":"M","value":"m-1","order":1,"editMode":false},{"id":2,"name":"F","value":"f-2","order":2,"editMode":false}],"slug":"sexo","id":3},{"name":"Fecha de Nacimiento","type":"date","required":false,"size":"col-xs-12 col-sm-6 col-md-4 col-lg-3","tab_id":"1","options":[],"slug":"fecha-de-nacimiento","id":4},{"name":"C\u00e9dula de identidad","type":"text","required":false,"size":"col-xs-12 col-sm-6 col-md-4 col-lg-3","tab_id":"1","options":[],"slug":"cedula-de-identidad","id":5},{"name":"Edad","type":"number","required":true,"size":"col-xs-12 col-sm-6 col-md-4 col-lg-3","tab_id":"1","options":[],"slug":"edad","id":6},{"name":"Tipo de discapacidad","type":"text","required":false,"size":"col-xs-12 col-sm-6 col-md-4 col-lg-3","tab_id":"1","options":[],"slug":"tipo-de-discapacidad","id":7},{"name":"Direcci\u00f3n","type":"text","required":false,"size":"col-xs-12 col-sm-6 col-md-6 col-lg-6","tab_id":"1","options":[],"slug":"direccion","id":8},{"name":"Barrio","type":"text","required":false,"size":"col-xs-12 col-sm-6 col-md-4 col-lg-3","tab_id":"1","options":[],"slug":"barrio","id":9},{"name":"Municipio","type":"text","required":false,"size":"col-xs-12 col-sm-6 col-md-4 col-lg-3","tab_id":"1","options":[],"slug":"municipio","id":10},{"name":"Departamento","type":"select","required":true,"size":"col-xs-12 col-sm-6 col-md-4 col-lg-3","tab_id":"1","options":[{"id":1,"name":"Chinandega","value":"chinandega-1","order":1,"editMode":false},{"id":2,"name":"Le\u00f3n","value":"leon-2","order":2,"editMode":false},{"id":3,"name":"Managua","value":"managua-3","order":3,"editMode":false},{"id":4,"name":"Masaya","value":"masaya-4","order":4,"editMode":false},{"id":5,"name":"Carazo","value":"carazo-5","order":5,"editMode":false},{"id":6,"name":"Granada","value":"granada-6","order":6,"editMode":false},{"id":7,"name":"Rivas","value":"rivas-7","order":7,"editMode":false},{"id":8,"name":"Nueva Segovia","value":"nueva-segovia-8","order":8,"editMode":false},{"id":9,"name":"Madriz","value":"madriz-9","order":9,"editMode":false},{"id":10,"name":"Estel\u00ed","value":"esteli-10","order":10,"editMode":false},{"id":11,"name":"Jinotega","value":"jinotega-11","order":11,"editMode":false},{"id":12,"name":"Matagalpa","value":"matagalpa-12","order":12,"editMode":false},{"id":13,"name":"Boaco","value":"boaco-13","order":13,"editMode":false},{"id":14,"name":"Chontales","value":"chontales-14","order":14,"editMode":false},{"id":15,"name":"R\u00edo San Juan","value":"rio-san-juan-15","order":15,"editMode":false},{"id":16,"name":"RAAN","value":"raan-16","order":16,"editMode":false},{"id":17,"name":"RAAS","value":"raas-17","order":17,"editMode":false}],"slug":"departamento","id":11},{"name":"Tel\u00e9fono","type":"text","required":false,"size":"col-xs-12 col-sm-6 col-md-4 col-lg-3","tab_id":"1","options":[],"slug":"telefono","id":12},{"name":"Nombre del Padre de Familia","type":"text","required":false,"size":"col-xs-12 col-sm-6 col-md-6 col-lg-6","tab_id":"1","options":[],"slug":"nombre-del-padre-de-familia","id":13},{"name":"Tel\u00e9fono Opcional","type":"text","required":false,"size":"col-xs-12 col-sm-6 col-md-4 col-lg-3","tab_id":"1","options":[],"slug":"telefono-opcional","id":14}]}]';

        Form::create([
            'form_name' => 'Formulario 1',
            'form_fields' => json_decode($fields),
        ]);
    }
}

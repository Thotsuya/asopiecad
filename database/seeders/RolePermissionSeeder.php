<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::create(['name' => 'Ver Usuarios']);
        Permission::create(['name' => 'Crear Usuarios']);
        Permission::create(['name' => 'Editar Usuarios']);
        Permission::create(['name' => 'Eliminar Usuarios']);

        Permission::create(['name' => 'Ver Roles']);
        Permission::create(['name' => 'Crear Roles']);
        Permission::create(['name' => 'Editar Roles']);
        Permission::create(['name' => 'Eliminar Roles']);

        Permission::create(['name' => 'Ver Proyectos']);
        Permission::create(['name' => 'Crear Proyectos']);
        Permission::create(['name' => 'Editar Proyectos']);
        Permission::create(['name' => 'Eliminar Proyectos']);

        Permission::create(['name' => 'Ver Formullarios']);
        Permission::create(['name' => 'Crear Formullarios']);
        Permission::create(['name' => 'Editar Formullarios']);
        Permission::create(['name' => 'Eliminar Formullarios']);

        Permission::create(['name' => 'Ver Beneficiarios']);
        Permission::create(['name' => 'Crear Beneficiarios']);
        Permission::create(['name' => 'Editar Beneficiarios']);
        Permission::create(['name' => 'Eliminar Beneficiarios']);
        Permission::create(['name' => 'Aprobar Beneficiarios']);

        Role::create(['name' => 'Super Admin'])->syncPermissions(Permission::all()->modelKeys());
        Role::create(['name' => 'Admin'])->syncPermissions(Permission::all()->modelKeys());
        Role::create(['name' => 'Gerente'])->givePermissionTo([
            'Ver Proyectos',
            'Ver Formullarios',
            'Ver Beneficiarios',
            'Crear Beneficiarios',
            'Editar Beneficiarios',
            'Eliminar Beneficiarios',
            'Aprobar Beneficiarios'
        ]);

    }
}

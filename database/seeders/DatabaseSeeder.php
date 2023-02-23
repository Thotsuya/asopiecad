<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Benefitiary;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call([
            FormSeeder::class,
            RolePermissionSeeder::class,
        ]);

        $user = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('secret'),
        ])->assignRole('Super Admin');

        \App\Models\User::factory(10)->create()->each(function ($user) {
            $user->assignRole('Gerente');
        });

        $this->call([
            ProjectSeeder::class,
            //BenefitiarySeeder::class,
        ]);

        $user->projects()->attach(Project::all()->modelKeys());

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}

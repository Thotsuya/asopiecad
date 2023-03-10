<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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

        $users = [
            [
                'name'     => 'Super Admin',
                'email'    => 'admin@admin.com',
                'password' => bcrypt('secret'),
            ],
            [
                'name'     => 'Facilitador 1',
                'email'    => 'facilitador1@asopiecad.com',
                'password' => bcrypt('secret'),
            ],
            [
                'name'     => 'Facilitador 2',
                'email'    => 'facilitador2@asopiecad.com',
                'password' => bcrypt('secret'),
            ],
            [
                'name'     => 'Facilitador 3',
                'email'    => 'facilitador3@asopiecad.com',
                'password' => bcrypt('secret'),
            ],
        ];

        collect($users)->each(function ($user) {
            $newUser = User::create($user);
            $newUser->assignRole('Super Admin');
            $newUser->projects()->attach(Project::all()->modelKeys());
        });


        $this->call([
            //ProjectSeeder::class,
            //BenefitiarySeeder::class,
        ]);



    }
}

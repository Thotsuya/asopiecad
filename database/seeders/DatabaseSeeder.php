<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //Execute the file asopieca_asopiecad.sql in the database
        DB::unprepared(file_get_contents(__DIR__ . '/asopieca_asopiecad.sql'));



//        $this->call([
////            FormSeeder::class,
////            RolePermissionSeeder::class,
////            ProjectSeeder::class,
//            //NewFormsSeeder::class,
//            //GoalSeeder::class
//        ]);

//        $users = [
//            [
//                'name'     => 'Super Admin',
//                'email'    => 'admin@admin.com',
//                'password' => bcrypt('secret'),
//            ],
//            [
//                'name'     => 'Facilitador 1',
//                'email'    => 'facilitador1@asopiecad.com',
//                'password' => bcrypt('secret'),
//            ],
//            [
//                'name'     => 'Facilitador 2',
//                'email'    => 'facilitador2@asopiecad.com',
//                'password' => bcrypt('secret'),
//            ],
//            [
//                'name'     => 'Facilitador 3',
//                'email'    => 'facilitador3@asopiecad.com',
//                'password' => bcrypt('secret'),
//            ],
//            [
//                'name'     => 'Facilitador 4',
//                'email'    => 'facilitador4@asopiecad.com',
//                'password' => bcrypt('secret')
//            ],
//            [
//                'name' => 'Promotor P4211 - 1',
//                'email' => 'promotornueva-p4211@asopiecad.com',
//                'password' => bcrypt('asopiecad')
//            ],
//            [
//                'name' => 'Promotor P4211 - 2',
//                'email' => 'promotoracoy-p4211@asopiecad.com',
//                'password' => bcrypt('asopiecad')
//            ]
//        ];

//        collect($users)->each(function ($user) {
//            $newUser = User::create($user);
//            $newUser->assignRole('Super Admin');
//            $newUser->projects()->attach(Project::all()->modelKeys());
//        });


//        $this->call([
//            //ProjectSeeder::class,
//            //BenefitiarySeeder::class,
//        ]);
    }
}

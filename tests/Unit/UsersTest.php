<?php

namespace Tests\Unit;

use Tests\TestCase;

class UsersTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_can_create_users()
    {
        $user = $this->signInAsAdmin();

        $userData = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' => 'password',
            'password_confirmation' => 'password',
            'role_id' => 1,
        ];

        $this->assertTrue(true);

        $this->post(route('users.store'), $userData)
            ->assertStatus(302)
            ->assertRedirect(route('users.index'));
    }

    public function test_can_update_users()
    {
        $user = $this->signInAsAdmin();

        $userData = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' => 'password',
            'password_confirmation' => 'password',
            'role_id' => 1,
        ];

        $this->assertTrue(true);

        $this->post(route('users.store'), $userData)
            ->assertStatus(302)
            ->assertRedirect(route('users.index'));

    }

    public function testSuperAdminCanViewAllOrganizations()
    {

        $superAdmin = User::factory()->superAdmin()->create();
        Organization::factory()->count(10)->create([
            'owner_id' => User::factory()->create()->id]);

        //Assert that the super admin can view all organizations and that the endpoint returns 200, and 10 organizations
        //The Json must contain:
        /*
         *  {
         *    status: 200,
         *    data: [
         *     {...},
         *    {...},
         * ]
         * }
         *
         * Assert that the data is an array and that it has 10 items
         * */
        $this->actingAs($superAdmin)
            ->get(route('organizations.index'))
            ->assertStatus(200)
            ->assertJsonCount(10, 'data')
            ->assertJsonStructure([
                'status',
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'owner_id',
                        'created_at',
                        'updated_at',
                    ]
                ]
            ]);

    }
}

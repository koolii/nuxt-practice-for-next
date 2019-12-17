<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LoginApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function setUp() {
        parent::setUp();

        $this->user = factory(User::class)->create();
    }

    public function test_should_return_registered_user() {
        $response = $this->json('POST', route('login'), [
            'email' => $this->user->email,
            'password' => 'secret',
        ]);

        // 500が返る
        $response
            ->assertStatus(200)
            ->assertJson(['name' => $this->user->name]);

        $this->assertAuthenticatedAs($this->user);
    }
}

<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LogoutApiTest extends TestCase
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

    public function setUp()
    {
    parent::setUp();
        // make a user for test
        $this->user = factory(User::class)->create();
    }

    public function test_should_logout_user() {
        $response = $this->actingAs($this->user)
                         ->json('POST', route('logout'));

        // 500が返る
        $response->assertStatus(200);
        $this->assertGuest();
    }
}

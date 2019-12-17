<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserApiTest extends TestCase
{
    use RefreshDatabase;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
    }

    public function test_should_return_logined_user()
    {
        $response = $this->actingAs($this->user)->json('GET', route('user'));
        $response
            ->assertStatus(200)
            ->assertJson([
                'name' => $this->user->name,
            ]);
    }

    public function test_should_return_empty()
    {
        $response = $this->json('GET', route('user'));
        $response->assertStatus(200);
        $this->assertEquals('', $response->content());
    }
}

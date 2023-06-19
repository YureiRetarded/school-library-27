<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use App\Models\Country;
use App\Models\Role;
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
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $roles = [
            [
                'name' => 'Обычный пользователь',
                'access_level' => 1,
            ],
            [
                'name' => 'Библиотекарь',
                'access_level' => 5,
            ],
            [
                'name' => 'Администратор',
                'access_level' => 9,
            ],
        ];
        $countries = [
            [
                'name' => 'Россия'
            ],
            [
                'name' => 'СССР'
            ],
            [
                'name' => 'Российская империя'
            ],
            [
                'name' => 'Казахстан'
            ],
            [
                'name' => 'Белорусь'
            ],
        ];
        $categories = [
            [
                'name' => 'Художественная литература'
            ],
            [
                'name' => 'Научная литература'
            ],
            [
                'name' => 'Учебник'
            ],
            [
                'name' => 'Документ'
            ],
        ];
        foreach ($roles as $role) {
            Role::create($role);
        }
        foreach ($countries as $country) {
            Country::create($country);
        }
        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}

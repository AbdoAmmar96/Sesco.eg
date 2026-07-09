<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            ContentSeeder::class,
            // Overrides the product groups/featured with the client's real
            // catalogue data extracted from "Website Products.xlsx".
            WebsiteProductsSeeder::class,
        ]);
    }
}

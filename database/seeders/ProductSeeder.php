<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('products')->insert([
            // 🍇 Fruits
            ['product_name' => 'Dragon Fruit', 'remark' => 'fruit', 'created_at' => now(), 'updated_at' => now()],
            ['product_name' => 'Rambutan', 'remark' => 'fruit', 'created_at' => now(), 'updated_at' => now()],
            ['product_name' => 'Persimmon', 'remark' => 'fruit', 'created_at' => now(), 'updated_at' => now()],
            ['product_name' => 'Starfruit', 'remark' => 'fruit', 'created_at' => now(), 'updated_at' => now()],
            ['product_name' => 'Black Sapote', 'remark' => 'fruit', 'created_at' => now(), 'updated_at' => now()],
            ['product_name' => 'Lychee', 'remark' => 'fruit', 'created_at' => now(), 'updated_at' => now()],
            ['product_name' => 'Mulberry', 'remark' => 'fruit', 'created_at' => now(), 'updated_at' => now()],
            ['product_name' => 'Tamarillo', 'remark' => 'fruit', 'created_at' => now(), 'updated_at' => now()],

            // 🥦 Veggies & Herbs
            ['product_name' => 'Kale', 'remark' => 'vegetable', 'created_at' => now(), 'updated_at' => now()],
            ['product_name' => 'Fennel Bulb', 'remark' => 'vegetable', 'created_at' => now(), 'updated_at' => now()],
            ['product_name' => 'Watercress', 'remark' => 'herb', 'created_at' => now(), 'updated_at' => now()],
            ['product_name' => 'Taro Root', 'remark' => 'vegetable', 'created_at' => now(), 'updated_at' => now()],
            ['product_name' => 'Chayote', 'remark' => 'vegetable', 'created_at' => now(), 'updated_at' => now()],
            ['product_name' => 'Sorrel Leaves', 'remark' => 'herb', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}

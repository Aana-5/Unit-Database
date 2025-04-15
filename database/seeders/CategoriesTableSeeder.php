<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'category_name' => 'Electronics',
                'remark' => 'Devices and gadgets'
            ],
            [
                'category_name' => 'Furniture',
                'remark' => 'Home and office furniture'
            ],
            [
                'category_name' => 'Clothing',
                'remark' => 'Apparel and accessories'
            ],
            [
                'category_name' => 'Books',
                'remark' => 'Educational and leisure books'
            ],
            [
                'category_name' => 'Groceries',
                'remark' => 'Food and beverages'
            ],
            [
                'category_name' => 'Toys',
                'remark' => 'Kids and educational toys'
            ],
        ]);
    }
}


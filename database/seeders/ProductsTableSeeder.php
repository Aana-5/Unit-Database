<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('products')->insert([
            [
                'product_name' => 'Tomato',
                'remark' => 'Fresh and juicy',
                'category_name' => 'vegetable',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_name' => 'Mint',
                'remark' => 'Cool and refreshing',
                'category_name' => 'herb',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_name' => 'Apple',
                'remark' => 'Red and sweet',
                'category_name' => 'fruit',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

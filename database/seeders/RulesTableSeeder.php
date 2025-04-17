<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('rules')->insert([
            ['rule_id' => 1, 'rule_name' => 'Unit Create'],
            ['rule_id' => 2, 'rule_name' => 'Unit Edit'],
            ['rule_id' => 3, 'rule_name' => 'Unit Delete'],
            ['rule_id' => 4, 'rule_name' => 'Product Create'],
            ['rule_id' => 5, 'rule_name' => 'Product Edit'],
            ['rule_id' => 6, 'rule_name' => 'Product Delete'],
        ]);
    }
}

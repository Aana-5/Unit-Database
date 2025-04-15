<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitsTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('units')->insert([
            [
                'unit_name' => 'kg',
                'remark' => 'kilogram'
            ],
            [
                'unit_name' => 'cm',
                'remark' => 'centimeter'
            ],
            [
                'unit_name' => 'ltr',
                'remark' => 'liter'
            ],
            [
                'unit_name' => 'm',
                'remark' => 'meter'
            ],
            [
                'unit_name' => 'g',
                'remark' => 'gram'
            ],
            [
                'unit_name' => 'mm',
                'remark' => 'millimeter'
            ],
        ]);
    }
}

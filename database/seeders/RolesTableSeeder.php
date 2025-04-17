<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            ['role_name' => 'Admin', 'user_id' => 1],
            ['role_name' => 'Editor', 'user_id' => 2],
            ['role_name' => 'Viewer', 'user_id' => 3],
        ]);
    }
}

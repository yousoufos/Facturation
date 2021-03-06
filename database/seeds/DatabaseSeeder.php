<?php

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
         $this->call([
             ProduitsTableSeeder::class,
             ClientsTableSeeder::class,
             FacturesTableSeeder::class,
             TvaTableSeeder::class,
             ModeReglementSeeder::class,
             InformationTableSeeder::class,
             LaratrustSeeder::class


         ]);
    }
}

<?php

use App\Produit;
use Faker\Factory;
use Illuminate\Database\Seeder;

class ProduitsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        $a=array(7,13,19,28);
        foreach(range(10,60) as $i){
            Produit::create([
                'designation' => 'PROD-1000'.$i,
                'tva' => $faker->randomElement($a),
                'prix' => mt_rand(100,1000)
            ]);
        }
    }
}

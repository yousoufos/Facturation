<?php

use App\Client;
use Faker\Factory;
use Illuminate\Database\Seeder;

class ClientsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        foreach(range(10,60) as $i){
            Client::create([
                'nom' => $faker->name,
                'user_id' => 1,
                'adresse' => $faker->address,
                'tel' => $faker->phoneNumber,
                'email' => $faker->email,
                'matricule' => $faker->isbn10,
                'raison' => $faker->randomElement($array = array('particulier','societé','association')),
            ]);
        }
    }
}

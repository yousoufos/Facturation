<?php

use App\Information;
use Illuminate\Database\Seeder;

class InformationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Information::create([
            'nom' => 'Example',
            'raison' =>'Example',
            'matricule' =>'Example',
            'registre' =>'Example',
            'adresse' =>'Example',
            'tel' =>'123456789',
            'email' =>'Example@example.com',
            'logo' =>'http://nouvelentrepreneur.fr/wp-content/uploads/sites/7/2017/06/entreprise.jpg',
            'rib' =>'Example',
        ]);
}
}

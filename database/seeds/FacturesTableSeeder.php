<?php

use App\Facture;
use Faker\Factory;
use App\LigneFacture;
use Illuminate\Database\Seeder;

class FacturesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        $b=1;
        foreach(range(1,25)as$i){
            $facture = Facture::create([
                'reference' => 'FACT-2000'.$b,
                'client_id' => $i,
                'date_emission' => date('Y-m-d',strtotime($i.'-12-2018')),
                'date_echeance' => date('Y-m-d',strtotime($i.'-12-2018')),
                'total_ht' => mt_rand(1000,2000),
                'total_ttc' => mt_rand(2000,3000),
                'total_tva' => mt_rand(100,999),
                'total_remise' => mt_rand(0,50),
                'statut' =>$faker->randomElement($array = array('en cours','clos','en attente')),
                'mode_reglement' =>$faker->randomElement($array = array('espece','cheque','CB')),
                
            ]);
            $b++;
            foreach(range(1,mt_rand(2,4))as$i){
                LigneFacture::create([
                    'facture_id' => $facture->id,
                    'produit_id' => mt_rand(1,40),
                    'qte' => mt_rand(1,50),
                    'remise' => mt_rand(0,50)
                ]);
            }
        }
    }
}

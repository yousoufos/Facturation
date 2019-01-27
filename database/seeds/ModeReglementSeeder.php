<?php

use App\ModeReglement;
use Illuminate\Database\Seeder;

class ModeReglementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $a=array('CB','Cheque','Espece');
        foreach($a as $i){
           ModeReglement::create([
               'modeReglement' => $i
           ]);
        }
    }
}

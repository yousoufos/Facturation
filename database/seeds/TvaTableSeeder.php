<?php

use App\Tva;
use Illuminate\Database\Seeder;

class TvaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $a=array(7,13,19,28);
        foreach($a as $i){
           Tva::create([
               'value' => $i
           ]);
        }
    }
}

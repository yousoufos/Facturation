<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reglement extends Model
{
    public function Facture(){
        return $this->belongsTo('App\Facture');
    }
}

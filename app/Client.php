<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = ['nom','adresse','matricule','tel','email','raison'];

    public function factures(){
        
        return $this->hasMany('App\Facture');
    }
}

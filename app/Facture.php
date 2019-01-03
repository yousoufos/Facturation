<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    protected $fillable = ['date_emission','date_echeance','client_id','statut','mode_reglement','reference','total_ht','total_ttc','total_tva','total_remise'];

    protected $guarded = [];

    public function client(){
        return $this->belongsTo('App\Client');
    }

    public function SuperProduit(){
        return $this->hasMany('App\LigneFacture');
    }
    public function Reglement(){
        return $this->hasMany('App\Reglement');
    }


}

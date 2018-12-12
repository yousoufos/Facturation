<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LigneFacture extends Model
{
    protected $fillable = ['qte','remise','produit_id','facture_id'];
   

    public function Produit(){
        return $this->belongsTo('App\Produit');
    }

    public function Facture(){
        return $this->belongsTo('App\Facture');
    }
    
    
}

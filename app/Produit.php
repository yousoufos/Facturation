<?php

namespace App;

use App\Produit;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    protected $fillable = ['designation','tva'];

    public function Facture(){

        return $this->HasMany('App\LigneFacture');
    }
}

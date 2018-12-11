<?php

namespace App\Http\Controllers;

use App\Client;
use App\Facture;
use App\Produit;
use App\LigneFacture;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index(){
        $facture = LigneFacture::find(4)->Facture;
        dd($facture);
        
        
        
    }
}

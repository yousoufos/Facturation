<?php

namespace App\Http\Controllers;

use App\Client;
use App\Facture;
use App\Produit;
use App\LigneFacture;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function admin(){
        return view('layouts.app');



    }
    public function facturation(){
        return view('layouts.vuejs');
    }
}

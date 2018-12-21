<?php

namespace App\Http\Controllers;

use App\Facture;
use App\LigneFacture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreFactureRequest;

class FactureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $facture = Facture::All();
        return response()->json($facture);
    }
    public function reference($id){
        return ('Fact-'.date('Y').'-'.$id);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreFactureRequest $request)
    {

        $facture = new Facture;
        $facture->save();
        $facture->reference = $this->reference($facture->id);
        $facture->statut = $request->get('statut');
        $facture->date_emission = $request->get('date_emission');
        $facture->date_echeance = $request->get('date_echeance');
        $facture->client_id = $request->get('client_id');
        $facture->total_ht = $request->get('total_ht');
        $facture->total_ttc = $request->get('total_ttc');
        $facture->total_remise = $request->get('total_remise');
        $facture->total_tva = $request->get('total_tva');
        $facture->save();
        $lignes = $request->get('lignes');
        $li=array();
         foreach($lignes as $key=>$ligne)
         {
            $l = new LigneFacture;
            $l->produit_id= $ligne['produit_id'];
            $l->facture_id = $facture->id;
            $l->qte = $ligne['qte'];
            $l->remise = $ligne['remise'];
            $l->save();
            array_push($li,$l);
         }

        return response()->json($li,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Facture  $facture
     * @return \Illuminate\Http\Response
     */
    public function show(Facture $facture)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Facture  $facture
     * @return \Illuminate\Http\Response
     */
    public function edit(Facture $facture)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Facture  $facture
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Facture $facture)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Facture  $facture
     * @return \Illuminate\Http\Response
     */
    public function destroy(Facture $facture)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Reglement;
use App\Events\ReglementAdd;
use Illuminate\Http\Request;
use App\Events\ReglementDeleted;

class ReglementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reglement = Reglement::All();
        return response()->json($reglement);
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
    public function store(Request $request)
    {
        $reglement = new Reglement();
        $reglement->mode_reglement = $request->get('mode_reglement');
        $reglement->montant = $request->get('montant');
        $reglement->date_reglement = $request->get('date_reglement');
        $reglement->facture_id = $request->get('facture_id');
        $reglement->save();
        broadcast(new ReglementAdd($reglement));
        return response()->json(['reglement'=> $reglement]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Reglement  $reglement
     * @return \Illuminate\Http\Response
     */
    public function show(Reglement $reglement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Reglement  $reglement
     * @return \Illuminate\Http\Response
     */
    public function edit(Reglement $reglement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Reglement  $reglement
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Reglement $reglement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Reglement  $reglement
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $reglement = Reglement::findOrFail($id);
        broadcast(new ReglementDeleted($reglement));
        $reglement->delete();
        return response()->json('Reglement '.$id.' effacé avec succée');
    }

}

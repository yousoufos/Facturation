<?php

namespace App\Http\Controllers;

use App\ModeReglement;
use Illuminate\Http\Request;

class ModeReglementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $modeReglement = ModeReglement::All();
        return response()->json(['modeReglement'=> $modeReglement]);

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
        $modeReglement = new ModeReglement;
        $modeReglement->modeReglement = $request->get('modeReglement');
        $modeReglement->save();
        return response()->json(['modeReglement'=> $modeReglement]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ModeReglement  $modeReglement
     * @return \Illuminate\Http\Response
     */
    public function show(ModeReglement $modeReglement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ModeReglement  $modeReglement
     * @return \Illuminate\Http\Response
     */
    public function edit(ModeReglement $modeReglement)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ModeReglement  $modeReglement
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $modeReglement = ModeReglement::find($id);
        $modeReglement->update($request->all());
        return response()->json('successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ModeReglement  $modeReglement
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $modeReglement = ModeReglement::findOrFail($id);
        $modeReglement->delete();
        return response()->json('modeReglement '.$id.' effacé avec succée');
    }
}

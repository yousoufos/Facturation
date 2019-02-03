<?php

namespace App\Http\Controllers;

use App\tva;
use Illuminate\Http\Request;

class TvaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tva = Tva::All();
        return response()->json(['tva'=> $tva]);
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
        $tva = new Tva;
        $tva->value = $request->get('tva');
        $tva->save();
        return response()->json(['tva'=> $tva]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\tva  $tva
     * @return \Illuminate\Http\Response
     */
    public function show(tva $tva)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\tva  $tva
     * @return \Illuminate\Http\Response
     */
    public function edit(tva $tva)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\tva  $tva
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $tva = Tva::find($id);
        $tva->update($request->all());
        return response()->json('successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\tva  $tva
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tva = Tva::findOrFail($id);
        $tva->delete();
        return response()->json('tva '.$id.' effacé avec succée');
    }
}

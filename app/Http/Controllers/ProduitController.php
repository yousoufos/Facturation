<?php

namespace App\Http\Controllers;

use App\produit;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProduitRequest;

class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $produits = Produit::All();
        return response()->json($produits);
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
    public function store(StoreProduitRequest $request)
    {
        $produit = new Produit;
        $produit->code = $request->get('code');
        $produit->designation = $request->get('designation');
        $produit->prix = $request->get('prix');
        $produit->tva = $request->get('tva');
        $produit->save();
        return response()->json(['produit'=> $produit]);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\produit  $produit
     * @return \Illuminate\Http\Response
     */
    public function show(produit $produit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\produit  $produit
     * @return \Illuminate\Http\Response
     */
    public function edit(produit $produit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\produit  $produit
     * @return \Illuminate\Http\Response
     */
    public function update(StoreProduitRequest $request, $id)
    {
        $produit = Produit::find($id);
        $produit->update($request->all());
        return response()->json('successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\produit  $produit
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
     $produit = Produit::findOrFail($id);
        $produit->delete();
        return response()->json('Produit '.$id.' effacé avec succée');
    }
}

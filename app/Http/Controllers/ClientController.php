<?php

namespace App\Http\Controllers;

use App\client;
use Illuminate\Http\Request;
use App\Events\ClientCreated;
use App\Events\ClientDeleted;
use App\Events\ClientUpdated;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\StoreClientRequest;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $client = Client::All();
        return response()->json($client);
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
    public function store(StoreClientRequest $request)
    {
        $client = new Client;
        $client->nom = $request->get('nom');
        $client->user_id = $request->get('user_id');
        $client->raison = $request->get('raison');
        $client->matricule = $request->get('matricule');
        $client->tel = $request->get('tel');
        $client->email = $request->get('email');
        $client->adresse = $request->get('adresse');
        $client->save();
        Log::info($client);
         //broadcast(new ClientCreated($client));
        return response()->json(['client'=> $client]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(client $client)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\client  $client
     * @return \Illuminate\Http\Response
     */
    public function edit(client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(StoreClientRequest $request, $id)
    {
        $client = Client::find($id);
        $client->update($request->all());
        //broadcast(new ClientUpdated($client));
        return response()->json('successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        //broadcast(new ClientDeleted($client));
        $client->delete();
        return response()->json('client '.$id.' effacé avec succée');
    }
}

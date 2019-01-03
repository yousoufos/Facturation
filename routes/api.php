<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/facture/create', 'FactureController@store');
Route::get('/client', 'ClientController@index');
Route::get('/produit', 'ProduitController@index');
Route::get('/facture', 'FactureController@index');
Route::get('/facture/lignesfacture', 'LigneFactureController@index');
Route::get('/facture/reglementfacture', 'ReglementController@index');

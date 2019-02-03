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
Route::post('/facture/reglementfacture/add', 'ReglementController@store');
Route::post('/produit/add', 'ProduitController@store');
Route::post('/client/add', 'ProduitController@store');
Route::post('/tva/add', 'TvaController@store');
Route::post('/modereglement/add', 'ModeReglegmentController@store');
Route::get('/facture/lignesfacture', 'LigneFactureController@index');
Route::get('/facture/reglementfacture', 'ReglementController@index');
Route::get('/client', 'ClientController@index');
Route::get('/produit', 'ProduitController@index');
Route::get('/facture', 'FactureController@index');
Route::get('/tva', 'TvaController@index');
Route::get('/information', 'InformationController@index');
Route::get('/modereglement', 'ModeReglementController@index');
Route::put('/facture/update/{id}', 'FactureController@update');
Route::put('/produit/update/{id}', 'ProduitController@update');
Route::put('/tva/update/{id}', 'TvaController@update');
Route::put('/modereglement/update/{id}', 'ModeReglementController@update');
Route::put('/information/update/{id}', 'InformationController@update');
Route::put('/client/update/{id}', 'ClientController@update');
Route::delete('/facture/reglementfacture/delete/{id}', 'ReglementController@destroy');
Route::delete('/produit/delete/{id}', 'ProduitController@destroy');
Route::delete('/client/delete/{id}', 'ClientController@destroy');
Route::delete('/tva/delete/{id}', 'TvaController@destroy');
Route::delete('/modereglement/delete/{id}', 'ModeReglementController@destroy');
Route::delete('/information/delete/{id}', 'InformationController@destroy');

<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', 'PageController@facturation');
Route::group(['middleware' => 'web'], function(){
    Route::auth();
    Auth::routes();
    Route::get('/home', 'HomeController@index')->name('home');
    Route::get('/admin', 'PageController@admin');
    Route::post('/log', 'AuthController@authenticate')->name('log');
});


Route::get('/facturation{any}', [
    'as' => 'root_facturation'	,
    'uses' => 'PageController@facturation'

    ])->where('any', '^(?!api\/)[\/\w\.-]*');





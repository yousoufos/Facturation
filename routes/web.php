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
Auth::routes();
Route::get('/', 'PageController@facturation');
Route::get('/admin', 'PageController@admin');
Route::get('/logout', 'AuthController@deco')->middleware('auth:web');
Route::group(['middleware' => 'auth:web'], function(){
    Route::group(['middleware' => 'role:superadministrator'], function(){
        Route::get('/home', 'HomeController@index')->name('home');
        Route::resource('/users','UserController');
        Route::resource('/roles','RoleController');
        Route::resource('/permissions','PermissionController');
    });


});
Route::get('/facturation{any}', [
    'as' => 'root_facturation'	,
    'uses' => 'PageController@facturation'
    ])->where('any', '^(?!api\/)[\/\w\.-]*');

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

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

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('qr-code-generator', function () {

    \QrCode::size(500)
        ->format('png')
		->color()
        ->generate('ItSolutionStuff.com', public_path('storage/img/' . Str::random(2), time(), Str::random(2) . '.png'));
});

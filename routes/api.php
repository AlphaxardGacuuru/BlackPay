<?php

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

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('qr-code-generator', function () {

    // Generate unique name
    $uniqueName = Str::random(4);

    // Generate url
    $url = "https://pay.black.co.ke/api/token/" . $uniqueName;

    return \QrCode::size(500)
        ->format('png')
        ->color(0, 0, 0, 100)
        ->backgroundColor(0, 111, 62, 100)
        ->margin(2)
        ->merge('/public/android-chrome-512x512.png')
        ->generate('ItSolutionStuff.com', public_path('storage/qr-codes/' . $uniqueName . '.png'));
});

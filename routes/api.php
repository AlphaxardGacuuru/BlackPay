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
// Social logins
Route::get('login/{website}', 'Auth\LoginController@redirectToProvider');
Route::get('login/{website}/callback', 'Auth\LoginController@handleProviderCallback');


Route::get('/home', 'HomeController@index')->name('home');
Route::apiResource('tokens', 'TokenController')->parameters(['tokens' => 'tokens']);
Route::apiResource('kopokopo', 'KopokopoPaymentController');
Route::apiResource('paid-tokens', 'PaidTokenController');

// Generate QR Codes
Route::get('qr-code-generator', function () {

    // Generate unique name
    $uniqueName = Str::random(4);

    return \QrCode::size(500)
        ->format('png')
        ->color(0, 0, 0, 100)
        ->backgroundColor(0, 111, 62, 100)
        ->margin(2)
        ->merge('/public/android-chrome-512x512.png', .2)
        ->errorCorrection('H')
        ->generate($uniqueName, public_path('storage/qr-codes/' . $uniqueName . '.png'));
});

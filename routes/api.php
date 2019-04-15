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

Route::get('/inventory/view-stock', 'Api\ProductController@index');
Route::get('/inventory/client-view-stock', 'Api\ProductController@indexClient');
Route::get('/suppliers', 'Api\ProviderController@index');
Route::post('/supplier/add-products', 'Api\ProductController@store');
Route::post('/client/buy-products', 'Api\InvoiceController@store');
Route::put('/client/cancel-buy-products/{invoiceCode}', 'Api\InvoiceController@update');
Route::get('/reports/{who}', 'Api\InvoiceController@index');

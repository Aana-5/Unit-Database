<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\ProductController;

// Units
Route::get('/units/view', [UnitController::class, 'view']);
Route::get('/units/create', [UnitController::class, 'create']);
Route::get('/units/edit/{id}', [UnitController::class, 'edit']);
Route::get('/units-data', [UnitController::class, 'getAll']);
Route::get('/units-data/{id}', [UnitController::class, 'getById']);
Route::post('/units-store', [UnitController::class, 'store']);
Route::put('/units-update/{id}', [UnitController::class, 'update']);
Route::delete('/units/{id}', [UnitController::class, 'delete']);

// Products
Route::get('/products/view', [ProductController::class, 'view']);
Route::get('/products/create', [ProductController::class, 'create']);
Route::get('/products-data', [ProductController::class, 'getAll']);
Route::get('/products-data/{id}', [ProductController::class, 'getById']);
Route::post('/products-store', [ProductController::class, 'store']);
Route::put('/products-update/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'delete']);

// Product-Unit Merge View
Route::get('/products-units/view', [ProductController::class, 'view']);
Route::get('/products-units-data', [ProductController::class, 'getWithUnits']);

// Home
Route::get('/', function () {
    return view('welcome');
});

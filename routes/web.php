<?php

use Illuminate\Support\Facades\Route;
use App\Models\Unit;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/units/view', function () {
    return view('react');
});

Route::get('/units/create', function () {
    return view('react');
});

Route::get('/units/edit/{id}', function ($id) {
    return view('react');
});

Route::get('/units-data', function () {
    return response()->json(Unit::all());
});

Route::get('/units-data/{id}', function ($id) {
    return response()->json(Unit::findOrFail($id));
});

Route::post('/units-store', function (Request $request) {
    $request->validate([
        'unit_name' => 'required|string|max:255',
        'remark' => 'nullable|string|max:255',
    ]);

    Unit::create([
        'unit_name' => $request->unit_name,
        'remark' => $request->remark,
    ]);

    return response()->json(['message' => 'Unit created successfully!']);
});

Route::put('/units-update/{id}', function (Request $request, $id) {
    $request->validate([
        'unit_name' => 'required|string|max:255',
        'remark' => 'nullable|string|max:255',
    ]);

    $unit = Unit::findOrFail($id);
    $unit->update([
        'unit_name' => $request->unit_name,
        'remark' => $request->remark,
    ]);

    return response()->json(['message' => 'Unit updated successfully!']);
});

Route::delete('/units/{id}', function ($id) {
    $unit = \App\Models\Unit::find($id);
    if (!$unit) {
        return response()->json(['message' => 'Unit not found.'], 404);
    }
    $unit->delete();
    return response()->json(['message' => 'Unit deleted']);
});

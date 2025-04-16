<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Unit;

class UnitController extends Controller
{
    public function view()
    {
        return view('react');
    }

    public function create()
    {
        return view('react');
    }

    public function edit($id)
    {
        return view('react');
    }

    public function getAll()
    {
        return response()->json(Unit::all());
    }

    public function getById($id)
    {
        return response()->json(Unit::findOrFail($id));
    }

    public function store(Request $request)
    {
        $request->validate([
            'unit_name' => 'required|string|max:255',
            'remark' => 'nullable|string|max:255',
        ]);

        $unit = Unit::create([
            'unit_name' => $request->unit_name,
            'remark' => $request->remark,
        ]);

        return response()->json(['message' => 'Unit created successfully!', 'id' => $unit->id]);
    }

    public function update(Request $request, $id)
    {
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
    }

    public function delete($id)
    {
        $unit = Unit::find($id);
        if (!$unit) {
            return response()->json(['message' => 'Unit not found.'], 404);
        }
        $unit->delete();
        return response()->json(['message' => 'Unit deleted']);
    }
}

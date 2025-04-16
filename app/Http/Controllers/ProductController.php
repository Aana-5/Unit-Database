<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function view()
    {
        return view('react');
    }

    public function create()
    {
        return view('react');
    }

    public function getAll()
    {
        return response()->json(Product::all());
    }

    public function getById($id)
    {
        return response()->json(Product::findOrFail($id));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'remark' => 'nullable|string|max:255',
            'unit_id' => 'nullable|exists:units,id',
            'category_name' => 'nullable|string|max:255',
        ]);

        Product::create($validated);
        return response()->json(['message' => 'Product created successfully!']);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'remark' => 'nullable|string|max:255',
            'unit_id' => 'nullable|exists:units,id',
            'category_name' => 'nullable|string|max:255',
        ]);

        $product->update($validated);
        return response()->json(['message' => 'Product updated successfully!']);
    }

    public function delete($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully!']);
    }

    public function getWithUnits()
    {
        $products = Product::with('unit')->get();
        return response()->json($products);
    }
}

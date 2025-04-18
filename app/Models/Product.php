<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_name',
        'remark',
        'unit_id',
        'category_name',
    ];

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }
}

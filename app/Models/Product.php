<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name_product', 'quantity', 'lote', 'expiration_date', 'price', 'available'
    ];

    /**
     * @param $query
     * @return mixed
     */
    public function scopeGetProducts($query)
    {
        return $query->join('providers', 'products.provider_id', '=', 'providers.id')->whereRaw('available = 1')->get();
    }
}

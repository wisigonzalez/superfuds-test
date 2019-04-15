<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $connection = 'pgsql';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'products';

    protected $primaryKey = 'id_product';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name_product', 'quantity_product', 'lote', 'expiration_date', 'price_product', 'available'
    ];

    /**
     * @param null $where
     * @return mixed
     */
    public function getProductsWithProvider($where = false)
    {
        if (!$where) {
            $query = Product::join('providers', 'products.provider_id', '=', 'providers.id_provider');
        } else {
            $query = Product::where('available', '=', '1')->join('providers', 'products.provider_id', '=', 'providers.id_provider');
        }

        return $query;
    }
}

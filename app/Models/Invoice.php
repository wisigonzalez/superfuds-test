<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Invoice extends Model
{
    protected $connection = 'pgsql';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'invoices';
    protected $primaryKey = 'id_invoice';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code', 'product_id', 'quantity_invoice', 'price_invoice', 'provider_id', 'user_id'
    ];

    /**
     * @param null $where
     * @return mixed
     */
    public function getInvoicesByClient()
    {
        $query = DB::table($this->table)
            ->select(DB::raw('DISTINCT users.id_user'), 'users.name_user',
                DB::raw('SUM(invoices.quantity_invoice * invoices.price_invoice) AS total'))
            ->join('users', 'users.id_user', '=', 'invoices.user_id')
            ->groupBy('users.id_user')->paginate(5);

        return $query;
    }

    /**
     * @param null $where
     * @return mixed
     */
    public function getInvoicesBySupplier()
    {
        $query = DB::table($this->table)
            ->select(DB::raw('DISTINCT invoices.provider_id'), 'providers.name_provider',
                DB::raw('SUM(invoices.quantity_invoice * invoices.price_invoice) AS total'))
            ->join('providers', 'providers.id_provider', '=', 'invoices.provider_id')
            ->groupBy('invoices.provider_id', 'providers.name_provider')->paginate(5);

        return $query;
    }

    /**
     * @param null $where
     * @return mixed
     */
    public function getInvoicesByProduct()
    {
        $query = DB::table($this->table)
            ->select(DB::raw('DISTINCT invoices.product_id'), 'products.name_product', 'products.lote',
                DB::raw('SUM(invoices.quantity_invoice * invoices.price_invoice) AS total'))
            ->join('products', 'products.id_product', '=', 'invoices.product_id')
            ->groupBy('invoices.product_id', 'products.name_product', 'products.lote')->paginate(5);

        return $query;
    }
}

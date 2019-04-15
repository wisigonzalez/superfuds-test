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
    protected $table = 'public.invoices';
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
            ->select(DB::raw('DISTINCT users.id_user'), 'name_user',
                DB::raw('SUM(quantity_invoice * price_invoice) AS total'))
            ->join('invoices', 'invoices.user_id', '=', 'users.id_user')
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
                DB::raw('SUM(quantity_invoice * price_invoice) AS total'))
            ->join('providers', 'providers.id_provider', '=', 'invoices.provider_id')
            ->groupBy('invoices.provider_id')->paginate(5);

        return $query;
    }

    /**
     * @param null $where
     * @return mixed
     */
    public function getInvoicesByProduct()
    {
        $query = DB::table($this->table)
            ->select(DB::raw('DISTINCT product_id'), 'name_product', 'lote',
                DB::raw('SUM(quantity_invoice * price_invoice) AS total'))
            ->join('products', 'products.id_product', '=', 'invoices.product_id')
            ->groupBy('product_id')->paginate(5);

        return $query;
    }
}

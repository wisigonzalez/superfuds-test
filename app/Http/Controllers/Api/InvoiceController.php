<?php

namespace App\Http\Controllers\Api;

use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($who)
    {
        $invoiceModel = new Invoice();
        switch ($who){
            case 'by-client':
                $report = $invoiceModel->getInvoicesByClient();
                break;
            case 'by-supplier':
                $report = $invoiceModel->getInvoicesBySupplier();
                break;
            case 'by-product':
                $report = $invoiceModel->getInvoicesByProduct();
                break;
        }

        return $report;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return string
     */
    public function store(Request $request)
    {
        $data = $request->request->all();
        $code = rand(1, 10);
        $code = md5($code);
        $user = rand(1,4);

        foreach ($data as $product) {
            $invoice = new Invoice();
            $invoice->code = $code;
            $invoice->product_id = $product['id_product'];
            $invoice->quantity_invoice = $product['quantity_product'];
            $invoice->provider_id = $product['id_provider'];
            $invoice->price_invoice = $product['price_product'];
            $invoice->user_id = $user;

            if ($invoice->save()) {
                $productUpdate = Product::find($product['id_product']);
                $productUpdate->quantity_product = ($productUpdate->quantity_product - $product['quantity_product']);
                if ($productUpdate->quantity_product == 0){
                    $productUpdate->available = 0;
                }
                $productUpdate->save();
            }
        }

        return $code;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $invoiceId)
    {
        $data = $request->request->all();
        $productsInInvoice = Invoice::where('code', '=', $invoiceId)->delete();

        foreach ($data as $product){
            $productUpdate = Product::find($product['id_product']);
            $productUpdate->quantity = ($productUpdate->quantity + $product['quantity']);
            if ($productUpdate->quantity > 0){
                $productUpdate->available = 1;
            }
            $productUpdate->save();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

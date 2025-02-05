<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Milon\Barcode\DNS1D;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Prototipo;
use App\Models\Componente;
use Inertia\Inertia;

class BarcodeController extends Controller
{
    public function index()
    {
        return Inertia::render('BarCode',[
            'prototipos'=> Prototipo::all(),
            'componentes' => Componente::all(),
        ]);
    }
}
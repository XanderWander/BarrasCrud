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
        return Inertia::render('Barcode', [
            'prototipos' => Prototipo::select('id', 'serial')->get(),
            'componentes' => Componente::select('id', 'serial')->get(),
        ]);
    }

    public function generarPDF($serial)
    {
        // Verificar si el serial existe en prototipos o componentes
        $prototipo = Prototipo::where('serial', $serial)->first();
        $componente = Componente::where('serial', $serial)->first();
        
        if (!$prototipo && !$componente) {
            abort(404, 'Serial no encontrado');
        }
        
        // Generar el código de barras
        $barcodeGenerator = new DNS1D;
        $barcode = $barcodeGenerator->getBarcodeHTML($serial, 'C128', 2, 60);
        
        // Generar el PDF
        $pdf = Pdf::loadView('pdf.codigo-barras', [
            'serial' => $serial,
            'barcode' => $barcode,
            'fecha' => now()->format('d/m/Y')
        ]);
        
        // Descargar el PDF
        return $pdf->download('codigo-barras.pdf');
    }

}
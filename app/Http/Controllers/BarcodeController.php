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
        /*// Verificar si el serial existe en prototipos o componentes
        $prototipo = Prototipo::whereIn('serial', explode(',', $serial))->first();
        $componente = Componente::whereIn('serial', explode(',', $serial))->first();
        
        if (!$prototipo && !$componente) {
            abort(404, 'Serial no encontrado');
        }{}
        
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
        return $pdf->download('codigo-barras.pdf');*/

        // Convertir la cadena de seriales en un array
        $seriales = explode(',', $serial);

        // Buscar los prototipos y componentes que coincidan con los seriales
        $prototipos = Prototipo::where('serial', $seriales)->get();
        $componentes = Componente::where('serial', $seriales)->get();

        echo "<script>console.log('Debug Objects: " . $serial . "' );</script>";

        // Si no se encuentra ningún serial, mostrar error
        if ($prototipos->isEmpty() && $componentes->isEmpty()) {
            abort(404, 'Seriales no encontrados');
        }

        // Generar códigos de barras para cada serial
        $barcodeGenerator = new DNS1D;
        $barcodes = [];
        foreach ($seriales as $serial) {
            $barcodes[] = [
                'serial' => $serial,
                'barcode' => $barcodeGenerator->getBarcodeHTML($serial, 'C128', 2, 60)
            ];
        }

        // Generar el PDF con múltiples códigos de barras
        $pdf = Pdf::loadView('pdf.codigo-barras', [
            'barcodes' => $barcodes,
        ]);

        // Descargar el PDF
        return $pdf->download('codigo-barras.pdf');
    }

}
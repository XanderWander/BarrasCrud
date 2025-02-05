<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Milon\Barcode\DNS1D;
use Illuminate\Support\Facades\Response;

class CodigoBarraController extends Controller
{
    public function generarPDF($serial){
        // Genera la imagen del código de barras
        $barcode = new DNS1D();
        $barcode->setEan(13); // Ajusta el tipo de código de barras si es necesario
        $barcode->setSize(60);
        $barcode->setThickness(2);
        $barcode->setForegroundColor(0, 0, 0);
        $barcode->setBackgroundColor(255, 255, 255);
        $barcode->setLabel($serial); // Agrega el serial como etiqueta (opcional)


        $imageData = base64_encode($barcode->getBarcodePNG($serial, 'PNG'));
        $barcodeImage = 'data:image/png;base64,' . $imageData;


        // Carga la vista y pasa los datos, incluyendo la imagen del código de barras
        $pdf = PDF::loadView('pdf.codigo-barras', ['serial' => $serial, 'barcodeImage' => $barcodeImage]);

        // Descarga el PDF
        return $pdf->download("codigo-barras-{$serial}.pdf");
    }
}

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Código de Barras</title>
    <style>
        .barcode-container {
            margin-bottom: 20px;
            page-break-inside: avoid;
        }
        .barcode-container{}
    </style>
</head>
<body style="font-family: Arial, sans-serif;">
    <h2>Código de Barras</h2>
    @foreach ($barcodes as $barcode)
        <div class="barcode-container">
            <p>Serial: {{ $barcode['serial'] }}</p>
            <div style="margin-top: 20px;">
                {!! $barcode['barcode'] !!}
            </div>
        </div>
    @endforeach
    
</body>
</html>
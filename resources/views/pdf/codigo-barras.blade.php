<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Código de Barras - {{ $serial }}</title>
</head>
<body style="font-family: Arial, sans-serif;">
    <div style="margin: 20px;">
        <h2>Código de Barras</h2>
        <p>Serial: {{ $serial }}</p>
        <p>Fecha: {{ $fecha }}</p>
        <div style="margin-top: 20px;">
            {!! $barcode !!}
        </div>
    </div>
</body>
</html>
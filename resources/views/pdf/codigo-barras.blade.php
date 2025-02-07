<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Código de Barras - {{ $serial }}</title>
    <style>
        .container { padding: 20px; text-align: center; }
        .barcode-image { margin: 20px 0; }
        .serial-number { font-family: Arial, sans-serif; font-size: 14px; margin-bottom: 10px; }
        .date { font-size: 10px; color: #666; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="serial-number">Serial: {{ $serial }}</div>
        <div class="barcode-image">{!! $barcode !!}</div>
        <div class="date">Generado: {{ $fecha }}</div>
    </div>
</body>
</html>
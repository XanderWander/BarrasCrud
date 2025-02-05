<!DOCTYPE html>
<html >
<head>
    <title>Codigo de Barras- {{ $serial }}</title>
</head>
<body>
    <div style="text-align: center;">
        <h1>Codigo de Barras</h1>
        <p>Serial {{ $serial }}</p>
        <img src="{{ $barcodeImage }}" 
             alt="Código de Barras" 
             style="width: 300px; height: 100px;">
    </div>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de Prototipos</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>
    <h1 style="text-align: center;">Reporte de Herramientas</h1>
    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                
                <th>Categoria</th>
                
                <th>Observacion</th>

            </tr>
        </thead>
        <tbody>
            @foreach ($herramientas as $herramienta)
                <tr>
                    <td>{{ $herramienta->Nombre }}</td>
                    
                    <td>{{ $herramienta->Categoria }}</td>
                    {{-- <td>{{ $herramienta->Descripcion }}</td> --}}
                    <td>{{ $herramienta->Observacion }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>

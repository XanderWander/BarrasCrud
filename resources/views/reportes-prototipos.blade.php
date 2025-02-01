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
    <h1 style="text-align: center;">Reporte de Prototipos</h1>
    <table>
        <thead>
            <tr>
                <th>Serial</th>
                <th>Modelo</th>
                <th>Categoría</th>
                <th>Características</th>
                <th>Observaciones</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($prototipos as $prototipo)
                <tr>
                    <td>{{ $prototipo->Serial }}</td>
                    <td>{{ $prototipo->Modelo }}</td>
                    <td>{{ $prototipo->Categoria }}</td>
                    <td>{{ $prototipo->Caracteristicas }}</td>
                    <td>{{ $prototipo->Observaciones }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>

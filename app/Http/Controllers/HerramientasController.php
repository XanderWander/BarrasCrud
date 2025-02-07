<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Herramienta;

class HerramientasController extends Controller
{
    
    public function index()
    {
        $herramientas = Herramienta::all(); 
        return Inertia::render('Herramientas', [
            'herramientas' => $herramientas, 
        ]);
    }
    
    public function create()
    {
        return Inertia::render('Herramientas/Create');
    }


    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'observaciones' => 'nullable|string',
        ]);

        Herramienta::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'observaciones'=> $request->observaciones,
        ]);

        return redirect()->route('herramientas')->with('success', 'Herramienta agregada correctamente.');
    }

    public function edit($id)
    {
        $this->authorize('update', $herramienta);
        $herramienta = Herramienta::findOrFail($id);
        return Inertia::render('Herramientas/Edit', [
            'herramienta' => $herramienta, 
        ]);
    }

    public function update(Request $request, $id)
    {
        $this->authorize('update', $herramienta);
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'observaciones' => 'nullable|string',
        ]);

        $herramienta = Herramienta::findOrFail($id);
        $herramienta->update($request->all());
        
        return response()->json(['message' => 'Componente actualizado correctamente'], 200);
    }
   
    public function destroy($id)
    {
        $this->authorize('update', $herramienta);
        $herramienta = Herramienta::findOrFail($id); 
        $herramienta->delete();

        return redirect()->route('herramientas')->with('success', 'Herramienta eliminada correctamente.');
    }

    public function generarPDF()
    {
        $herramientas = Herramienta::all();

        // Generar el PDF usando una vista Blade
        $pdf = Pdf::loadView('reportes-herramientas', compact('herramientas'));

        // Descargar el PDF
        return $pdf->stream('reporte_herramienta.pdf'); // Cambiar a do
    }
}
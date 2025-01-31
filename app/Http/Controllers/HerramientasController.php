<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Herramienta;

class HerramientasController extends Controller
{
    
    public function index()
    {
        $herramientas = Herramienta::all(); 
        return Inertia::render('Herramientas/Index', [
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

        return redirect()->route('herramientas.index')->with('success', 'Herramienta agregada correctamente.');
    }

    public function edit($id)
    {
        $herramienta = Herramienta::findOrFail($id);
        return Inertia::render('Herramientas/Edit', [
            'herramienta' => $herramienta, 
        ]);
    }

    public function update(Request $request, $id)
    {
        
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'observaciones' => 'nullable|string',
        ]);

        $herramienta = Herramienta::findOrFail($id);
        $herramienta->update([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'observaciones'=> $request->observaciones,
        ]);

        return redirect()->route('herramientas.index')->with('success', 'Herramienta actualizada correctamente.');
    }
   
    public function destroy($id)
    {
        $herramienta = Herramienta::findOrFail($id); 
        $herramienta->delete();

        return redirect()->route('herramientas.index')->with('success', 'Herramienta eliminada correctamente.');
    }
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Componente; 

class ComponentesController extends Controller
{
    // Mostrar la lista de componentes
    public function index()
    {
        $componentes = Componente::all(); 
        return Inertia::render('Componentes', [
            'componentes' => $componentes,
        ]);
    }

    
    public function create()
    {
        return Inertia::render('Componentes/Create');
    }

    
    public function store(Request $request)
    {
        
        $request->validate([
            'serial' => 'required|string|unique:componentes|max:255',
            'descripcion' => 'required|string',
            'categoria' => 'required|string|max:255',
            'observacion' => 'nullable|string',
        ]);

       
        Componente::create([
            'serial' => $request->serial,
            'descripcion' => $request->descripcion,
            'categoria' => $request->categoria,
            'observacion' => $request->observacion,
        ]);

       
        return redirect()->route('componentes')->with('success', 'Componente creado correctamente.');
    }

   
    public function edit($id)
    {
        $componente = Componente::findOrFail($id); 
        return Inertia::render('Componentes/Edit', [
            'componente' => $componente,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'serial' => 'required|string|max:255|unique:componentes,serial,' . $id,
            'descripcion' => 'required|string',
            'categoria' => 'required|string|max:255',
            'observacion' => 'nullable|string',
        ]);

        $componente = Componente::findOrFail($id);

        $componente->update([
            'serial' => $request->serial,
            'descripcion' => $request->descripcion,
            'categoria' => $request->categoria,
            'observacion' => $request->observacion,
        ]);

        return redirect()->route('componentes')->with('success', 'Componente actualizado correctamente.');
    }

    // Eliminar un componente
    public function destroy($id)
    {
        $componente = Componente::findOrFail($id); 
        $componente->delete(); 

        return redirect()->route('componentes')->with('success', 'Componente eliminado correctamente.');
    }
}
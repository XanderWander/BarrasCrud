<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Prototipo; 

class PrototiposController extends Controller
{
    
    public function index()
    {
        $prototipos = Prototipo::all(); 
        return Inertia::render('Prototipos', [
            'prototipos' => $prototipos,
        ]);
    }

    public function create()
    {
        return Inertia::render('Prototipos/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'serial' => 'required|string|unique:prototipos|max:255',
            'modelo' => 'required|string|max:255',
            'caracteristicas' => 'nullable|string',
            'observacion' => 'nullable|string',
        ]);

        Prototipo::create([
            'serial' => $request->serial,
            'modelo' => $request->modelo,
            'caracteristicas' => $request->caracteristicas,
            'observacion' => $request->observacion,
        ]);

        return redirect()->route('prototipos')->with('success', 'Prototipo creado correctamente.');
    }

    public function edit($id)
    {
        $prototipo = Prototipo::findOrFail($id); // Buscar el prototipo por ID
        return Inertia::render('Prototipos/Edit', [
            'prototipo' => $prototipo,
        ]);
    }

    // Actualizar un prototipo existente
    public function update(Request $request, $id)
    {
        // Validar los datos del formulario
        $request->validate([
            'serial' => 'required|string|max:255|unique:prototipos,serial,' . $id,
            'modelo' => 'required|string|max:255',
            'caracteristicas' => 'nullable|string',
            'observacion' => 'nullable|string',
        ]);

        $prototipo = Prototipo::findOrFail($id);

        $prototipo->update($request->all());

        return response()->json(['message' => 'Componente actualizado correctamente'], 200);
    }

    // Eliminar un prototipo
    public function destroy($id)
    {
        $prototipo = Prototipo::findOrFail($id); 
        $prototipo->delete(); 

        return redirect()->route('prototipos')->with('success', 'Prototipo eliminado correctamente.');
    }
}
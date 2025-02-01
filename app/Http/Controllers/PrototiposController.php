<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Prototipo; 

class PrototiposController extends Controller
{
    // Mostrar la lista de prototipos
    public function index()
    {
        $prototipos = Prototipo::all(); // Obtener todos los prototipos
        return Inertia::render('Prototipos', [
            'prototipos' => $prototipos,
        ]);
    }

    // Mostrar el formulario para crear un nuevo prototipo
    public function create()
    {
        return Inertia::render('Prototipos/Create');
    }

    // Guardar un nuevo prototipo en la base de datos
    public function store(Request $request)
    {
        // Validar los datos del formulario
        $request->validate([
            'serial' => 'required|string|unique:prototipos|max:255',
            'modelo' => 'required|string|max:255',
            'caracteristicas' => 'nullable|string',
            'observacion' => 'nullable|string',
        ]);

        // Crear el prototipo en la base de datos
        Prototipo::create([
            'serial' => $request->serial,
            'modelo' => $request->modelo,
            'caracteristicas' => $request->caracteristicas,
            'observacion' => $request->observacion,
        ]);

        // Redirigir a la lista de prototipos con un mensaje de éxito
        return redirect()->route('prototipos.index')->with('success', 'Prototipo creado correctamente.');
    }

    // Mostrar el formulario para editar un prototipo existente
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

        // Buscar el prototipo por ID
        $prototipo = Prototipo::findOrFail($id);

        // Actualizar los datos del prototipo
        $prototipo->update([
            'serial' => $request->serial,
            'modelo' => $request->modelo,
            'caracteristicas' => $request->caracteristicas,
            'observacion' => $request->observacion,
        ]);

        // Redirigir a la lista de prototipos con un mensaje de éxito
        return redirect()->route('prototipos.index')->with('success', 'Prototipo actualizado correctamente.');
    }

    // Eliminar un prototipo
    public function destroy($id)
    {
        $prototipo = Prototipo::findOrFail($id); // Buscar el prototipo por ID
        $prototipo->delete(); // Eliminar el prototipo

        // Redirigir a la lista de prototipos con un mensaje de éxito
        return redirect()->route('prototipos.index')->with('success', 'Prototipo eliminado correctamente.');
    }
}
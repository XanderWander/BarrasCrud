<?php

use App\Http\Controllers\BarcodeController;
use App\Http\Controllers\CodigoBarraController;
use App\Http\Controllers\ComponentesController;
use App\Http\Controllers\HerramientasController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PrototiposController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::inertia('/dashboard', 'Dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::inertia('/dashboard', 'Dashboard');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// routes/api.php o web.php
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', function () {
        return "Panel de administrador";
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // rutas componentes
    Route::get('/componentes', [ComponentesController::class, 'index'])->name('componentes');
    Route::post('/componentes', [ComponentesController::class, 'store'])->name('componentes.store');
    Route::get('/componentes/{id}/editar', [ComponentesController::class, 'edit'])->name('componentes.edit');
    Route::put('/componentes/{id}', [ComponentesController::class, 'update'])->name('componentes.update');
    Route::delete('/componentes/{id}', [ComponentesController::class, 'destroy'])->name('componentes.destroy');
    

    //Rutas de Prototipos
    Route::get('/prototipos', [PrototiposController::class, 'index'])->name('prototipos');
    Route::get('/prototipos/crear', [PrototiposController::class, 'create'])->name('prototipos.create');
    Route::post('/prototipos', [PrototiposController::class, 'store'])->name('prototipos.store');
    Route::get('/prototipos/{id}/editar', [PrototiposController::class, 'edit'])->name('prototipos.edit');
    Route::put('/prototipos/{id}', [PrototiposController::class, 'update'])->name('prototipos.update');
    Route::delete('/prototipos/{id}', [PrototiposController::class, 'destroy'])->name('prototipos.destroy');

    //Rutas de Herramientas
    Route::get('/herramientas', [HerramientasController::class, 'index'])->name('herramientas');
    Route::get('/herramientas/crear', [HerramientasController::class, 'create'])->name('herramientas.create');
    Route::post('/herramientas', [HerramientasController::class, 'store'])->name('herramientas.store');
    Route::get('/herramientas/{id}/editar', [HerramientasController::class, 'edit'])->name('herramientas.edit');
    Route::put('/herramientas/{id}', [HerramientasController::class, 'update'])->name('herramientas.update');
    Route::delete('/herramientas/{id}', [HerramientasController::class, 'destroy'])->name('herramientas.destroy');

    Route::get('/barcode', [BarcodeController::class, "index"])->name('barcode');
    Route::get('/generar-codigo-barras/{serial}', [CodigoBarraController::class, 'generarPDF'])->name('codigo.barras.pdf');
});

require __DIR__ . '/auth.php';

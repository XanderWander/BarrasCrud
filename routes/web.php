<?php

use App\Http\Controllers\BarcodeController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    
    Route::get('/componentes', [ComponentesController::class, "index"])->name('componentes');
    Route::get('/herramientas', [HerramientasController::class, "index"])->name('herramientas');
    Route::get('/prototipos', [PrototiposController::class, "index"])->name('prototipos');
    Route::get('/barcode', [BarcodeController::class, "index"])->name('barcode');


});

require __DIR__ . '/auth.php';

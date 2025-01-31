<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Response;

class ComponentesController extends Controller
{
    public function index(Request $request) {
        return Inertia::render('Componentes', );
    }
}
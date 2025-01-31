<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BarcodeController extends Controller
{
    public function index(Request $request) {
        return Inertia::render('Barcode', );
    }
}

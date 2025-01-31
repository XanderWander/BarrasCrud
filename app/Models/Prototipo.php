<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prototipo extends Model
{
    use HasFactory;

    protected $table = 'prototipos';

    protected $fillable = [
        'serial',
        'modelo',
        'caracteristicas',
        'observacion',
    ];

    protected $hidden = [
        
    ];

    protected $casts = [
        
    ];
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Componente extends Model
{
    use HasFactory;

    
    protected $table = 'componentes';

    
    protected $fillable = [
        'serial',
        'descripcion',
        'categoria',
        'observacion',
    ];

    protected $hidden = [

    ];

    protected $casts = [
        
    ];
}
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComponentesTable extends Migration
{
    public function up()
    {
        Schema::create('componentes', function (Blueprint $table) {
            $table->id(); // Columna autoincremental para el ID
            $table->string('serial')->unique(); // Serial único
            $table->text('descripcion'); // Descripción del componente
            $table->string('categoria'); // Categoría del componente
            $table->text('observacion')->nullable(); // Observación (opcional)
            $table->timestamps(); // Columnas created_at y updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('componentes');
    }
}
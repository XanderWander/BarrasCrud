<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHerramientasTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('herramientas', function (Blueprint $table) {
            $table->id(); // Columna autoincremental para el ID
            $table->string('nombre'); // Nombre de la herramienta
            $table->text('observaciones')->nullable(); // Observaciones (opcional)
            $table->text('descripcion')->nullable(); // Descripción (opcional)
            $table->timestamps(); // Columnas created_at y updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('herramientas');
    }
};

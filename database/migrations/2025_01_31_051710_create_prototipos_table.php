<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrototipoTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('prototipos', function (Blueprint $table) {
            $table->id(); 
            $table->string('serial')->unique(); 
            $table->string('modelo'); 
            $table->text('caracteristicas')->nullable(); 
            $table->text('observacion')->nullable(); 
            $table->timestamps(); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('prototipos');
    }
};

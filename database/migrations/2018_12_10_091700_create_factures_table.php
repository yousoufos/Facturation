<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFacturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('factures', function (Blueprint $table) {
            $table->increments('id');
            $table->string('reference',50)->unique();
            $table->unsignedInteger('client_id');
            $table->date('date_emission');
            $table->date('date_echeance');
            $table->decimal('total_ht');
            $table->decimal('total_ttc');
            $table->decimal('total_remise');
            $table->decimal('total_tva');
            $table->string('statut');
            $table->string('mode_reglement');
            $table->timestamps();
            
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('factures');
    }
}

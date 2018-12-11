<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLigneFacturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ligne_factures', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('facture_id');
            $table->unsignedInteger('produit_id');
            $table->decimal('qte');
            $table->decimal('remise');
            $table->foreign('produit_id')->references('id')->on('produits')->onUpdate('cascade')->onDelete('cascade');
            
            
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
        Schema::dropIfExists('ligne_factures');
    }
}

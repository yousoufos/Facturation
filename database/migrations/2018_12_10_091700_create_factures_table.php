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
            $table->integer('user_id');
            $table->string('reference',50)->unique()->nullable();
            $table->unsignedInteger('client_id')->nullable();
            $table->dateTime('date_emission')->nullable();
            $table->dateTime('date_echeance')->nullable();
            $table->decimal('total_ht',10,3)->nullable();
            $table->decimal('total_ttc',10,3)->nullable();
            $table->decimal('total_remise',10,3)->nullable();
            $table->decimal('total_tva',10,3)->nullable();
            $table->decimal('statut')->nullable();
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

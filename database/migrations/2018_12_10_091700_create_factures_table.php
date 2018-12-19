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
            $table->string('reference',50)->unique()->nullable();
            $table->unsignedInteger('client_id')->nullable();
            $table->dateTime('date_emission')->nullable();
            $table->dateTime('date_echeance')->nullable();
            $table->decimal('total_ht')->nullable();
            $table->decimal('total_ttc')->nullable();
            $table->decimal('total_remise')->nullable();
            $table->decimal('total_tva')->nullable();
            $table->string('statut')->nullable();
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

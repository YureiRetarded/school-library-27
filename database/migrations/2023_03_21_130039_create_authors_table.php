<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('authors', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('second_name')->nullable();
            $table->string('middle_name')->nullable();
            $table->date('date_birthday')->nullable();
            $table->date('date_death')->nullable();
            $table->text('bio')->nullable();
            $table->unsignedBigInteger('country_id')->nullable();
            $table->index('country_id', 'author_country_idx');
            $table->foreign('country_id', 'author_country_fk')->on('countries')->references('id');
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
        Schema::dropIfExists('authors');
    }
};

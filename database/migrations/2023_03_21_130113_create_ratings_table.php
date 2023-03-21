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
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('book_id');
            $table->index('book_id', 'book_rating_idx');
            $table->foreign('book_id', 'book_rating_fk')->on('books')->references('id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id', 'rating_user_fk')->on('users')->references('id');
            $table->integer('grade');
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
        Schema::dropIfExists('raitings');
    }
};

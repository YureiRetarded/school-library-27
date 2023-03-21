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
        Schema::create('author_book', function (Blueprint $table) {
            $table->unsignedBigInteger('author_id');
            $table->unsignedBigInteger('book_id');
            $table->index('author_id', 'author_author_book_idx');
            $table->index('book_id', 'author_book_book_idx');
            $table->foreign('author_id', 'author_author_book_fk')->on('authors')->references('id');
            $table->foreign('book_id', 'author_book_book_fk')->on('books')->references('id');
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
        Schema::dropIfExists('author_book');
    }
};

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
        Schema::create('books_users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('book_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('status_id');
            $table->index('user_id', 'books_users_user_idx');
            $table->foreign('book_id', 'book_books_users_fk')->on('books')->references('id');
            $table->foreign('user_id', 'books_users_user_fk')->on('users')->references('id');
            $table->foreign('status_id', 'books_users_status_fk')->on('statuses')->references('id');
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
        Schema::dropIfExists('books_users');
    }
};

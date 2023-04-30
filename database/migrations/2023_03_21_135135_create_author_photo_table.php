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
        Schema::create('author_photo', function (Blueprint $table) {
            $table->unsignedBigInteger('author_id');
            $table->unsignedBigInteger('file_id');
            $table->foreign('author_id', 'author_author_photo_fk')->on('authors')->references('id')->onDelete('cascade');
            $table->foreign('file_id', 'author_photo_file_fk')->on('files')->references('id')->onDelete('cascade');
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
        Schema::dropIfExists('author_photo');
    }
};

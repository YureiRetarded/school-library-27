<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'date_created',
        'description',
        'category_id',
        'file_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function image()
    {
        return $this->belongsToMany(File::class, 'book_logo');
    }

    public function authors()
    {
        return $this->belongsToMany(Author::class, 'author_book');
    }
}

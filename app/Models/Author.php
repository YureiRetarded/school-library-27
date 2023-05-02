<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'second_name',
        'middle_name',
        'bio',
        'country_id',
        'date_birthday',
        'date_death',
    ];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function image()
    {
        return $this->belongsToMany(File::class, 'author_photo');
    }
    public function books(){
        return $this->belongsToMany(Book::class,'author_book');
    }
}

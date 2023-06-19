<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $fillable = [
        'name',
    ];
    use HasFactory;

    public function author()
    {
        return $this->belongsToMany(Author::class, 'author_photo');
    }
}

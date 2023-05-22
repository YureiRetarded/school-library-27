<?php

namespace App\Http\Controllers\Book;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\File;
use Illuminate\Support\Facades\Storage;


class BookAllController extends Controller
{
    public function __invoke()
    {
        //Берём все книги
        $books = Book::all();
        //Отправляем
        return response()->json([
            'success' => true,
            'message' => 'Books data',
            'data' => $books,
        ]);
    }
}

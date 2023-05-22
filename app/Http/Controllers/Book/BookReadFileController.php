<?php

namespace App\Http\Controllers\Book;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Support\Facades\Storage;

class BookReadFileController extends Controller
{
    public function __invoke($id)
    {
        //Поиск книги по идентификатору
        $book = Book::find($id);
        //Если книга не найдена, возвращаем ошибку
        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Book not found',
            ]);
        }
        //Проверяем наличие файла книги
        if (!Storage::disk('ftp')->exists('books/' . $book->file->name)) {
            return response()->json([
                'success' => false,
                'message' => 'Book file not found',
            ]);
        }
        //Берём файл и обязательно конвертируем в base64 иначе json пошлёт нас
        $base64 = Storage::disk('ftp')->get('books/' . $book->file->name);
        return response()->json([
            'success' => true,
            'message' => 'Book file',
            'data' => base64_encode($base64)
        ]);
    }
}

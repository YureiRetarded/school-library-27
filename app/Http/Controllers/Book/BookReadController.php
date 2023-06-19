<?php

namespace App\Http\Controllers\Book;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\File;
use Faker\Provider\Base;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookReadController extends Controller
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
        //По умолчанию отправляется url картинки, которая используется для отображения авторов без картинок
        $book['imageURL'] = '127.0.0.1:8000/storage/images/no-image.webp';
        if (count($book->image) > 0) {
            if (File::find($book->image[0]->id)) {
                $file = File::find($book->image[0]->id);
                if (Storage::disk('public')->exists('images/' . $file->name)) {
                    $book['imageURL'] = '127.0.0.1:8000' . Storage::url('images/' . $file->name);;
                }
            }
        }
        //Берём категорию книги
        $category = $book->category->toArray();
        $book . array_push($category);
        //Берём авторов книги
        $authors = $book->authors->toArray();
        $book . array_push($authors);
        //Возвращаем книгу
        return response()->json([
            'success' => true,
            'message' => 'Successfully founded',
            'data' => $book
        ]);
    }
}

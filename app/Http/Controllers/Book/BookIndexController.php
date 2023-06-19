<?php

namespace App\Http\Controllers\Book;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\File;
use Illuminate\Support\Facades\Storage;

class BookIndexController extends Controller
{
    public function __invoke()
    {
        $books = Book::paginate(5);
        foreach ($books as $book) {
            //Вставляем имя автора
            $book['category_name'] = $book->category->name;
            $book['imageURL'] = '127.0.0.1:8000/storage/images/no-image.webp';
            $book->authors;
            if (count($book->image) > 0) {
                if (File::find($book->image[0]->id)) {
                    $file = File::find($book->image[0]->id);
                    if (Storage::disk('public')->exists('images/' . $file->name)) {
                        $book['imageURL'] = '127.0.0.1:8000' . Storage::url('images/' . $file->name);;
                    }
                }
            }
        }
        //Отправляем
        return response()->json([
            'success' => true,
            'message' => 'Books data',
            'data' => $books,
        ]);
    }
}

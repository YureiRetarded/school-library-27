<?php

namespace App\Http\Controllers\Book;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookDestroyController extends Controller
{
    public function __invoke($id)
    {
        //Поиск автора по идентификатору
        $book = Book::find($id);
        //Если автор не найден, возвращаем ошибку
        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Book not found',
            ]);
        }
        //Проверяем есть ли у автора, фотографии
        if (count($book->image) > 0) {
            //В случае если они есть
            $images = $book->image;
            foreach ($images as $image) {
                //Если фотография обнаружена в хранилище, удаляем её
                if (Storage::disk('public')->exists('images/' . $image->name)) {
                    Storage::disk('public')->delete('images/' . $image->name);
                }
                //Удаляем записи о фотографиях из бд
                File::find($image->id)->delete();
            }
        }

        if (Storage::disk('public')->exists('book/' . $book->file_id)) {
            Storage::disk('public')->delete('book/' . $book->file_id);
        }
        $book->delete();
        File::find($book->file_id)->delete();
        //Удаляем автора и возвращаем подтверждение

        return response()->json([
            'success' => true,
            'message' => 'Successfully removed',
        ]);
    }
}

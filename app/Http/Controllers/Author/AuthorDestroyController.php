<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\File;
use Illuminate\Support\Facades\Storage;

class AuthorDestroyController extends Controller
{
    public function __invoke($id)
    {
        //Поиск автора по идентификатору
        $author = Author::find($id);
        //Если автор не найден, возвращаем ошибку
        if (!$author) {
            return response()->json([
                'success' => false,
                'message' => 'Author not found',
            ]);
        }
        //Проверяем есть ли у автора, фотографии
        if (count($author->image) > 0) {
            //В случае если они есть
            $images = $author->image;
            foreach ($images as $image) {
                //Если фотография обнаружена в хранилище, удаляем её
                if (Storage::disk('public')->exists('images/' . $image->name)) {
                    Storage::disk('public')->delete('images/' . $image->name);
                }
                //Удаляем записи о фотографиях из бд
                File::find($image->id)->delete();
            }
        }
        //Удаляем автора и возвращаем подтверждение
        $author->delete();
        return response()->json([
            'success' => true,
            'message' => 'Successfully removed',
        ]);
    }
}

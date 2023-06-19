<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\File;
use Illuminate\Support\Facades\Storage;

class AuthorReadController extends Controller
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
        //По умолчанию отправляется url картинки, которая используется для отображения авторов без картинок
        $author['imageURL'] = '127.0.0.1:8000/storage/images/no-image.webp';
        if (count($author->image) > 0) {
            if (File::find($author->image[0]->id)) {
                $file = File::find($author->image[0]->id);
                if (Storage::disk('public')->exists('images/' . $file->name)) {
                    $author['imageURL'] = '127.0.0.1:8000' . Storage::url('images/' . $file->name);;
                }
            }
        }
        $country = $author->country->toArray();
        $author . array_push($country);
        //Иначе возвращаем автора
        return response()->json([
            'success' => true,
            'message' => 'Successfully founded',
            'data' => $author
        ]);
    }
}

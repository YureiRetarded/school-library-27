<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\File;
use Illuminate\Support\Facades\Storage;

class AuthorIndexController extends Controller
{
    public function __invoke()
    {
        //Для того чтобы frond-end не производил запросы связанные с названием стран и получения url изображения
        //Мы сразу, перед отправкой данных об авторах суём их в коллекцию
        $authors = Author::paginate(3);
        foreach ($authors as $author) {
            //Вставляем имя автора
            $author['country_name'] = $author->country->name;
            $author['imageURL'] = '127.0.0.1:8000/storage/images/no-image.webp';
            //Вставляем кол-во книг
            $author['count_book'] = $author->books->count();
            //Вставляем url изображений если они есть в бд и в хранилище
            if (count($author->image) > 0) {
                if (File::find($author->image[0]->id)) {
                    $file = File::find($author->image[0]->id);
                    if (Storage::disk('public')->exists('images/' . $file->name)) {
                        $author['imageURL'] = '127.0.0.1:8000' . Storage::url('images/' . $file->name);;
                    }
                }
            }
        }
        //Отправляем
        return response()->json([
            'success' => true,
            'message' => 'Authors data',
            'data' => $authors,
        ]);
    }
}

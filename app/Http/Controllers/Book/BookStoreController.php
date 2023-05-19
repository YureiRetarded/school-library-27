<?php

namespace App\Http\Controllers\Book;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookRequest;
use App\Models\Author;
use App\Models\Book;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Models\File;
use Intervention\Image\Facades\Image;

class BookStoreController extends Controller
{
    public function __invoke(BookRequest $request)
    {
        //Вытягиваем данные из запроса
        $data = [
            'name' => $request['name'],
            'description' => $request['description'],
            'category_id' => intval($request['category_id']),
            'date_created' => isset($request['date_created']) ? date('Y-m-d', strtotime($request['date_created'])) : null,
            'authors' => $request['authors'],
            'photo' => $request['photo'],
            'pdf' => $request['pdf'],
        ];
        foreach ($data['authors'] as $author_id) {
            if (Author::findOrFail($author_id) === false) {
                return response()->json([
                    'success' => false,
                    'message' => 'Author' . $author_id . ' not found',
                    'data' => '',
                ]);
            }
        }

        //Переменная для файла изображения
        $file_image = '';
        //Проверка на наличие изображения
        if (isset($data['photo'])) {
            //Берём картинку в base64
            $image = explode(',', $data['photo'])[1];
            //Создаём случайное имя файла
            $name = Str::random(240);
            //Проверяем что, файла с таким именем у нас нет
            while (File::where('name', $name)->first()) {
                //Если есть пересоздаём
                $name = Str::random(240);
            }
            //Сжимаем и конвертируем в webp, после сохраняем на диск
            Storage::disk('public')->put('images/' . $name . '.webp', Image::make(base64_decode($image))->resize('159', '232')->stream('webp', 10));
            //Создаём запись о файле в БД
            $file_image = File::create(['name' => $name . '.webp']);
        }

        //Берём файл в base64
        $document = explode(',', $data['pdf'])[1];
        //Создаём случайное имя файла
        $name = Str::random(240);
        //Проверяем что, файла с таким именем у нас нет
        while (File::where('name', $name)->first()) {
            //Если есть пересоздаём
            $name = Str::random(240);
        }

        Storage::disk('ftp')->put('books/' . $name . '.pdf', base64_decode($document));
        //Создаём запись о файле в БД
        $file_book = File::create(['name' => $name . '.pdf']);

        //Сохраняем автора
        $data['file_id'] = $file_book->id;

        $book = Book::create($data);
        $book->authors()->sync($data['authors']);
        if ($file_image !== '')
            $book->image()->sync($file_image->id);

        return response()->json([
            'success' => true,
            'message' => 'Book was added',
            'data' => $book,
        ]);
    }
}

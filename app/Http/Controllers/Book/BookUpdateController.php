<?php

namespace App\Http\Controllers\Book;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookUpdateRequest;
use App\Models\Book;
use App\Models\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class BookUpdateController extends Controller
{
    public function __invoke(BookUpdateRequest $request, $id)
    {
        //Поиск автора по идентификатору
        $book = Book::find($id);
        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Book not found',
            ]);
        }
        //Вытягиваем данные из запроса
        $data = [
            'name' => $request['name'],
            'description' => $request['description'],
            'category_id' => intval($request['category_id']),
            'date_created' => isset($request['date_created']) ? date('Y-m-d', strtotime($request['date_created'])) : null,
            'authors' => $request['authors'],
            'photo' => $request['photo'],
            'pdf' => $request['pdf'],
            'image_delete' => $request['image_delete'],
        ];
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
            Storage::disk('public')->put('images/' . $name . '.webp', Image::make(base64_decode($image))->resize('159', '232')->stream('webp', 50));
            //Создаём запись о файле в БД
            $file_image = File::create(['name' => $name . '.webp']);
        }
        //Проверяем есть ли у книги, фотография
        //Удаляем предыдущий файл с диска и из БД
        if ($data['image_delete'] || isset($data['photo'])) {
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
        }
        $oldFile = '';
        if ($data['pdf']) {
            $oldFile = $book->file;
            if (Storage::disk('ftp')->exists('books/' . $oldFile->name)) {
                //Удаляем файл с диска
                Storage::disk('ftp')->delete('books/' . $oldFile->name);
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
            $book->update($data);
            $book->save();
            $book->fresh();
            //Удаляем запись о старом файле
            File::find($oldFile->id)->delete();
            if ($file_image !== '')
                $book->image()->sync($file_image->id);
            return response()->json([
                'success' => true,
                'message' => 'Author was updated',
                'data' => $book,
            ]);
        } else {
            $book->update($data);
            $book->save();
            $book->fresh();
            if ($file_image !== '')
                $book->image()->sync($file_image->id);
            return response()->json([
                'success' => true,
                'message' => 'Author was updated',
                'data' => $book,
            ]);
        }
    }
}

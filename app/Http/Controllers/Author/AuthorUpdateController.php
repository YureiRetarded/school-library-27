<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthorStoreRequest;
use App\Models\Author;
use App\Models\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class AuthorUpdateController extends Controller
{
    public function __invoke(AuthorStoreRequest $request, $id)
    {
        //Поиск автора по идентификатору
        $author = Author::find($id);
        if (!$author) {
            return response()->json([
                'success' => false,
                'message' => 'Author not found',
            ]);
        }
        //Вытягиваем данные из запроса
        $data = [
            'first_name' => $request['first_name'],
            'second_name' => $request['second_name'],
            'middle_name' => $request['middle_name'],
            'bio' => $request['bio'],
            'country_id' => intval($request['country_id']),
            'date_birthday' => isset($request['date_birthday']) ? date('Y-m-d', strtotime($request['date_birthday'])) : null,
            'date_death' => isset($request['date_death']) ? date('Y-m-d', strtotime($request['date_death'])) : null,
            'photo' => $request['photo'],
            'image_delete' => $request['image_delete'],
        ];
        //Переменная для файла
        $file = '';
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
            $file = File::create(['name' => $name . '.webp']);
        }
        //Проверяем есть ли у автора, фотографии
        //Удаляем предыдущий файл с диска и из БД
        if ($data['image_delete'] || isset($data['photo'])) {
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
        }
        $author->update($data);
        $author->save();
        $author->fresh();
        if ($file !== '') {
            $author->image()->sync($file->id);
        }
        return response()->json([
            'success' => true,
            'message' => 'Author was updated',
            'data' => $author,
        ]);
    }
}

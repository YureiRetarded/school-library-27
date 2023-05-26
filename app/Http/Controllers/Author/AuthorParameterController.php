<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthorGetRequest;
use App\Models\Author;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AuthorParameterController extends Controller
{
    public function __invoke(AuthorGetRequest $request)
    {
        //Берём параметры из запроса
        $data = [
            'country_id' => intval($request['country_id']),
            'name' => $request['name']
        ];
        //Собираем запрос
        $query = DB::table('authors')
            ->select('authors.id');
        //Запрос по имени
        if ($data['name']) {
            $query->where('authors.first_name', 'like', '%' . $data['name'] . '%')
                ->orWhere('authors.second_name', 'like', '%' . $data['name'] . '%')
                ->orWhere('authors.middle_name', 'like', '%' . $data['name'] . '%');
        }
        //Запрос по странам
        if ($data['country_id']) {
            $query->where('authors.country_id', '=', $data['country_id']);
        }
        $authors = $this->paginate($query->distinct()->get(), 4, '', ["path" => url()->current()])->toArray();
        $tempAuthors = [];
        foreach ($authors['data'] as $key => $author) {
            $author = Author::find($author->id);
            $author['country_name'] = $author->country->name;
            $author['count_book'] = $author->books->count();
            $author['imageURL'] = '127.0.0.1:8000/storage/images/no-image.webp';
            if (count($author->image) > 0) {
                if (File::find($author->image[0]->id)) {
                    $file = File::find($author->image[0]->id);
                    if (Storage::disk('public')->exists('images/' . $file->name)) {
                        $author['imageURL'] = '127.0.0.1:8000' . Storage::url('images/' . $file->name);;
                    }
                }
            }
            $tempAuthors[] = $author;
        }
        $authors['data'] = $tempAuthors;
        //Отправляем
        return response()->json([
            'success' => true,
            'message' => 'Authors data',
            'data' => $authors,
        ]);
    }

}

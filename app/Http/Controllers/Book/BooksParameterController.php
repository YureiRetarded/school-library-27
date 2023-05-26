<?php

namespace App\Http\Controllers\Book;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookGetRequest;
use App\Models\Book;
use App\Models\File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BooksParameterController extends Controller
{
    public function __invoke(BookGetRequest $request)
    {
        //Берём параметры из запроса
        $data = [
            'authors' => $request['authors'] ?? [],
            'category_id' => intval($request['category_id']),
            'name' => $request['name']
        ];
        //Очищаем список авторов от необрабатываемых значений
        if ($data['authors']) {
            $clearArray = [];
            foreach ($data['authors'] as $key => $value) {
                if (is_int(intval($value)) && intval($value) !== 0) {
                    $clearArray[] = $value;
                }
            }
            $data['authors'] = $clearArray;
        }
        //Собираем запрос
        $query = DB::table('books')
            ->select('books.id')
            ->join('author_book', 'books.id', '=', 'author_book.book_id');
        //Запрос по имени
        if ($data['name']) {
            $query->where('books.name', 'like', '%' . $data['name'] . '%');
        }
        //Запрос по категориям
        if ($data['category_id']) {
            $query->where('books.category_id', '=', $data['category_id']);
        }
        //Запрос по авторам
        if (count($data['authors']) > 0) {
            $query->whereIntegerInRaw('author_book.author_id', $data['authors'])
                ->groupBy('books.id')
                ->havingRaw('count(DISTINCT author_book.author_id)=' . count($data['authors']));
        }
        //Получаем нужные id в пагинации
        $books = $this->paginate($query->distinct()->get(), 4, '', ["path" => url()->current()])->toArray();
        //Временная ошибка в алгоритме
        //Что я заметил, по какой-то причине книги на первой странице хранятся как массив массивов
        //А на второй и выше как ассоциативный массив из-за чего frontend начинает воспринимать его как объект и вылетает

        //Костыль: мы создаём временный массив книг куда суём необходимые книги, потом мы его суёт в массив для отправки
        $tempBooks = [];
        //Заменяем id-шники на нужные нам объекты
        foreach ($books['data'] as $key => $book) {
            $book = Book::find($book->id);
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
            $tempBooks[] = $book;
        }
        $books['data'] = $tempBooks;
        //Отправляем
        return response()->json([
            'success' => true,
            'message' => 'Books data',
            'data' => $books,
        ]);

    }
}

<?php

namespace App\Http\Controllers\Status;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SetUserStatusBookController extends Controller
{
    public function __invoke($id, Request $request)
    {
        //Берём статус пользователя
        $status_id = $request['statusId'];
        //Проверяем есть ли такой статус
        if (!Status::find($status_id)) {
            return response()->json([
                'success' => false,
            ]);
        }
        //Проверяем существует ли такая книга
        if (!Book::find($id)) {
            return response()->json([
                'success' => false,
            ]);
        }
        DB::table('books_users')->insert([
            'user_id' => auth()->user()->id,
            'book_id' => $id,
            'status_id' => $status_id,
            'created_at' => date('Y-m-d:h:m:s')
        ]);
        return response()->json([
            'success' => true,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Status;

use App\Http\Controllers\Controller;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DeleteUserStatusBookController extends Controller
{
    public function __invoke($id)
    {
        //Добавлена ли книги в список пользователя
        $isSetStatus = DB::table('books_users')
            ->where('user_id', auth()->user()->id)
            ->where('book_id', $id)
            ->first();
        //Если да, удаляем
        if ($isSetStatus) {
            DB::table('books_users')->delete($isSetStatus->id);
        }
        //Возвращаем ответ
        return response()->json([
            'success' => true,
        ]);
    }
}

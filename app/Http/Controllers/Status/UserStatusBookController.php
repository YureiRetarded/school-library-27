<?php

namespace App\Http\Controllers\Status;

use App\Http\Controllers\Controller;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserStatusBookController extends Controller
{
    public function __invoke($id)
    {
        //Берём все статусы
        $statuses = Status::all();
        //Берём статус установленный пользователем
        $userStatus = DB::table('books_users')
            ->where('user_id', auth()->user()->id)
            ->where('book_id', $id)
            ->first();
        //Возвращаем статусы и статут пользователя(если он его ставил)
        return response()->json([
            'success' => true,
            'data' => [
                'statuses' => $statuses,
                'userBookStatus' => $userStatus?->status_id
            ]
        ]);
    }
}

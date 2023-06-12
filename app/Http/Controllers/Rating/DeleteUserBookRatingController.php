<?php

namespace App\Http\Controllers\Rating;

use App\Http\Controllers\Controller;
use App\Models\Rating;
use Illuminate\Http\Request;

class DeleteUserBookRatingController extends Controller
{
    public function __invoke($id)
    {
        //Ищем оценку
        $grade = Rating::where('book_id', $id)->where('user_id', auth()->user()->id)->first();
        //Если есть удаляем
        if ($grade) {
            $grade->delete();
        }
        //Возвращаем ответ
        return response()->json([
            'success' => true,
        ]);
    }
}

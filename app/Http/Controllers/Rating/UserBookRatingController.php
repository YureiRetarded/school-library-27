<?php

namespace App\Http\Controllers\Rating;

use App\Http\Controllers\Controller;
use App\Models\Rating;
use Illuminate\Http\Request;

class UserBookRatingController extends Controller
{
    public function __invoke($id)
    {
        //Количество
        $count = Rating::where('book_id', $id)->count();
        //Оценки
        $grade = 0;
        //Считаем все оценки
        if ($count > 0) {
            foreach (Rating::where('book_id', $id)->get() as $element) {
                $grade = $grade + $element->grade;
            }
        }
        //Есть ли оценка пользователя
        $userRating = Rating::where('book_id', $id)->where('user_id', auth()->user()->id)->first();
        //Возвращаем ответ
        return response()->json([
            'success' => true,
            'data' => [
                'rating' => $grade,
                'users' => $count,
                'status' => isset($userRating),
                'userRating' => $userRating?->grade
            ]
        ]);
    }
}

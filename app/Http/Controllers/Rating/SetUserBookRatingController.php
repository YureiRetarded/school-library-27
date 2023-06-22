<?php

namespace App\Http\Controllers\Rating;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Rating;
use Illuminate\Http\Request;

class SetUserBookRatingController extends Controller
{
    public function __invoke($id, Request $request)
    {
        //Берём оценку из запроса
        $grade = $request['grade'];
        if ($grade > 10 || $grade < 0) {
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
        //Была ли выставлена оценка ранее
        $userGrade = Rating::where('book_id', $id)->where('user_id', auth()->user()->id)->first();
        //Если есть обновляем
        if ($userGrade) {
            $userGrade->grade = $grade;
            $grade->save();
        } else {
            //Иначе записываем
            Rating::create(['book_id' => $id, 'user_id' => auth()->user()->id, 'grade' => $grade]);
        }
        //Возвращаем ответ
        return response()->json([
            'success' => true,
        ]);
    }
}

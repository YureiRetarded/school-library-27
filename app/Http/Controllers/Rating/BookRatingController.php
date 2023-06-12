<?php

namespace App\Http\Controllers\Rating;

use App\Http\Controllers\Controller;
use App\Models\Rating;
use Illuminate\Http\Request;

class BookRatingController extends Controller
{
    public function __invoke($id)
    {
        //Количество
        $count = Rating::where('book_id', $id)->count();
        //Оценки
        $grade = 0;
        //Считаем все оценки
        foreach (Rating::where('book_id', $id)->get() as $element) {
            $grade = $grade + $element->grade;
        }
        //Возвращаем данные
        return response()->json([
            'success' => true,
            'data' => [
                'rating' => $grade / $count,
                'users' => $count
            ]
        ]);
    }
}

<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryIndexController extends Controller
{
    public function __invoke()
    {
        //Берём все категории и возвращаем их по страницам
        $categories = Category::paginate(5);
        return response()->json([
            'success' => true,
            'message' => 'Categories data',
            'data' => $categories,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;

class CategoryStoreController extends Controller
{
    public function __invoke(CategoryRequest $request)
    {
        //Берём данные из валидации
        $data = [
            'name' => $request['name'],
        ];
        //Сохраняем категорию
        $category = Category::create($data);
        //Возвращаем категорию
        return response()->json([
            'success' => true,
            'message' => 'Category data',
            'data' => $category,
        ]);
    }
}

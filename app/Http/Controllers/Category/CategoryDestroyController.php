<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryDestroyController extends Controller
{
    public function __invoke($id)
    {
        //Поиск категории по идентификатору
        $category = Category::find($id);
        //Если категория не найдена, возвращаем ошибку
        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found',
            ]);
        }
        //Иначе удаляем и возвращаем подтверждение
        $category->delete();
        return response()->json([
            'success' => true,
            'message' => 'Successfully removed',
        ]);
    }
}

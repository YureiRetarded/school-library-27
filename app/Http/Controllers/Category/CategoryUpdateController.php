<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
class CategoryUpdateController extends Controller
{
    public function __invoke(CategoryRequest $request, $id)
    {
        //Поиск категории по идентификатору
        $category = Category::find($id);
        //Если категория не найдена, возвращаем ошибку
        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Country not found',
            ]);
        }
        //Иначе меням наименование и сохраняем
        $category->name = $request['name'];
        $category->save();
        //Возвращаем подтверждение
        return response()->json([
            'success' => true,
            'message' => 'Successfully updated',
        ]);
    }
}

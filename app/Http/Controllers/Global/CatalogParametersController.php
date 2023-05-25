<?php

namespace App\Http\Controllers\Global;

use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\Category;
use Illuminate\Http\Request;

class CatalogParametersController extends Controller
{
    public function __invoke()
    {
        $authors = Author::all();
        $categories = Category::all();
        return response()->json([
            'success' => true,
            'data' => [
                'authors' => $authors,
                'categories' => $categories
            ]
        ]);
    }
}

<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use App\Models\Author;

class AuthorAllController extends Controller
{
    public function __invoke()
    {
        $authors = Author::all();
        //Отправляем
        return response()->json([
            'success' => true,
            'message' => 'Authors data',
            'data' => $authors,
        ]);
    }
}

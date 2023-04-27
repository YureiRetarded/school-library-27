<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;

class CheckUserController extends Controller
{
    public function __invoke()
    {
        //Получаем текущего пользователя
        $user = auth('sanctum')->user();
        $res = ['id' => $user['id'], 'access_level' => $user->role->access_level];
        //Возвращаем данные пользователя
        return response()->json([
            'success' => true,
            'message' => 'User token correct',
            'data' => $res,
        ]);
    }
}

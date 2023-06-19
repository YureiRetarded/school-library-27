<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\LogoutRequest;

class UserLogoutController extends Controller
{
    public function __invoke(LogoutRequest $request)
    {
        //Получаем текущего пользователя
        $user = auth('sanctum')->user();
        //Удаляем токен
        if ($user->tokens()->where('id', $request['tokenID'])->first()) {
            //Если, токен найден
            $user->tokens()->where('id', $request['tokenID'])->delete();
            return response()->json([
                'success' => true,
                'message' => 'Token deleted',
            ]);
        }
        //В случае если токен не найден, возвращается ошибка
        return response()->json([
            'success' => false,
            'message' => 'Incorrect data',
            'data' => ['token' => ['Токен не найден!']],
        ]);
    }
}

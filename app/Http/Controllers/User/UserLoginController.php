<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserLoginController extends Controller
{
    public function __invoke(LoginRequest $request)
    {
        //Ищем пользователя по логину, в случае ошибки возвращаем ошибку
        if (User::where('login', $request['login'])->first()) {
            $user = User::where('login', $request['login'])->first();
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Incorrect data',
                'data' => ['server' => ['Неправильный логин или пароль']],
            ]);
        }
        //Проверяем пароль пользователя
        if (Hash::check($request['password'], $user['password'])) {
            $token = User::find($user['id'])->createToken('user_token');
            $res = ['id' => $user['id'], 'access_level' => $user->role->access_level, 'token' => $token->plainTextToken];
            //Пароль верный, возвращаем токен доступа
            return response()->json([
                'success' => true,
                'message' => 'Finally, i get the token!',
                'data' => $res,
            ]);
            //Пароль неверный, возвращаем ошибку
        } else
            return response()->json([
                'success' => false,
                'message' => 'Incorrect data',
                'data' => ['server' => ['Неправильный логин или пароль']],
            ]);
    }
}

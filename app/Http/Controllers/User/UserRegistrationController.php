<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Hash;

class UserRegistrationController extends Controller
{
    public function __invoke(RegisterRequest $request)
    {
        //Данные нового пользователя
        $data = [
            'login' => $request['login'],
            'first_name' => $request['first_name'],
            'second_name' => $request['second_name'],
            'password' => Hash::make($request['password']),
            'role_id' => 1,
        ];
        //Создаём пользователя
        $user = User::create($data);
        //Обновляем пользователя
        $user = $user->fresh();
        //Создаём токен пользователя
        $token = $user->createToken('user_token');
        //Возвращаем пользователя
        return response()->json([
            'success' => true,
            'message' => 'Registration successfully!',
            'data' => ['id' => $user['id'], 'access_level' => $user->role->access_level, 'token' => $token->plainTextToken],
        ]);
    }
}

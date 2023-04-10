<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Hash;

class UserRegistrationController extends Controller
{
    public function __invoke(RegisterRequest $request)
    {
        $data = [
            'login' => $request['login'],
            'first_name' => $request['first_name'],
            'second_name' => $request['second_name'],
            'password' => Hash::make($request['password']),
            'role_id' => 1,
        ];
        $user = User::create($data);

        $token = $user->createToken('user_token');
        //НЕ работает вызов role если заново не взять user из бд
        $user = User::find($user['id']);
        $res = ['id' => $user['id'], 'access_level' => $user->role->access_level, 'token' => $token->plainTextToken];
        return response()->json([
            'success' => true,
            'message' => 'Registration successfully!',
            'data' => $res,
        ]);
    }
}

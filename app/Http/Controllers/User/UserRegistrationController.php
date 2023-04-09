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
        return response()->json([
            'success' => true,
            'message' => 'Ok',
            'data' => $user,
        ]);
    }
}

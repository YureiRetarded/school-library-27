<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class CheckUserController extends Controller
{
    public function __invoke()
    {
        $user = auth('sanctum')->user();
        $res = ['id' => $user['id'], 'access_level' => $user->role->access_level];
        return response()->json([
            'success' => true,
            'message' => 'User token correct',
            'data' => $res,
        ]);
    }
}

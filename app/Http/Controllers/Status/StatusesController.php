<?php

namespace App\Http\Controllers\Status;

use App\Http\Controllers\Controller;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatusesController extends Controller
{
    public function __invoke()
    {
        //Берём все статусы
        $statuses = Status::all();
        //Возвращаем данные
        return response()->json([
            'success' => true,
            'data' => [
                'statuses' => $statuses
            ]
        ]);
    }
}

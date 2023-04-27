<?php

namespace App\Http\Controllers\Country;

use App\Http\Controllers\Controller;
use App\Models\Country;

class CountryReadController extends Controller
{
    public function __invoke($id)
    {
        //Поиск страны по идентификатору
        $country = Country::find($id);
        //Если страна не найдена, возвращаем ошибку
        if (!$country) {
            return response()->json([
                'success' => false,
                'message' => 'Country not found',
            ]);
        }
        //Иначе возвращаем страну
        return response()->json([
            'success' => true,
            'message' => 'Successfully founded',
            'data' => $country
        ]);
    }
}

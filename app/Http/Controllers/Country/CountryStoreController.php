<?php

namespace App\Http\Controllers\Country;

use App\Http\Controllers\Controller;
use App\Http\Requests\CountryRequest;
use App\Models\Country;

class CountryStoreController extends Controller
{
    public function __invoke(CountryRequest $request)
    {
        //Берём данные из валидации
        $data = [
            'name' => $request['name'],
        ];
        //Сохраняем страну
        $country = Country::create($data);
        //Возвращаем страну
        return response()->json([
            'success' => true,
            'message' => 'Country data',
            'data' => $country,
        ]);
    }
}

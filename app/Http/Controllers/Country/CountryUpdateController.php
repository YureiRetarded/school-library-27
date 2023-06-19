<?php

namespace App\Http\Controllers\Country;

use App\Http\Controllers\Controller;
use App\Http\Requests\CountryRequest;
use App\Models\Country;

class CountryUpdateController extends Controller
{
    public function __invoke(CountryRequest $request, $id)
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
        //Иначе меням наименование и сохраняем
        $country->name = $request['name'];
        $country->save();
        //Возвращаем подтверждение
        return response()->json([
            'success' => true,
            'message' => 'Successfully updated',
        ]);
    }
}

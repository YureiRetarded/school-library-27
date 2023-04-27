<?php

namespace App\Http\Controllers\Country;

use App\Http\Controllers\Controller;
use App\Models\Country;

class CountryIndexController extends Controller
{
    public function __invoke()
    {
        //Берём все странны и возвращаем их
        $countries = Country::all();
        return response()->json([
            'success' => true,
            'message' => 'Countries data',
            'data' => $countries,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Country;

use App\Http\Controllers\Controller;
use App\Http\Requests\CountryRequest;
use App\Models\Country;
use Illuminate\Http\Request;

class CountryStoreController extends Controller
{
    public function __invoke(CountryRequest $request)
    {
        $data = [
            'name' => $request['name'],
        ];
        $country = Country::create($data);
        return response()->json([
            'success' => true,
            'message' => 'Country data',
            'data' => $country,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Country;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;

class CountryIndexController extends Controller
{
    public function __invoke()
    {
        $countries = Country::all();
        return response()->json([
            'success' => true,
            'message' => 'Countries data',
            'data' => $countries,
        ]);
    }
}

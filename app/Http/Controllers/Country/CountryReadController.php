<?php

namespace App\Http\Controllers\Country;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;

class CountryReadController extends Controller
{
    public function __invoke($id)
    {
        $country = Country::find($id);
        if (!$country) {
            return response()->json([
                'success' => false,
                'message' => 'Country not found',
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Successfully founded',
            'data' => $country
        ]);
    }
}

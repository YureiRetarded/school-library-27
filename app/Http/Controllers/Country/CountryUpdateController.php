<?php

namespace App\Http\Controllers\Country;

use App\Http\Controllers\Controller;
use App\Http\Requests\CountryRequest;
use App\Models\Country;
use Illuminate\Http\Request;

class CountryUpdateController extends Controller
{
    public function __invoke(CountryRequest $request, $id)
    {
        $country = Country::find($id);
        if (!$country) {
            return response()->json([
                'success' => false,
                'message' => 'Country not found',
            ]);
        }
        $country->name = $request['name'];
        $country->save();
        return response()->json([
            'success' => true,
            'message' => 'Successfully updated',
        ]);
    }
}

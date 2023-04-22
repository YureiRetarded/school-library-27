<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthorStoreRequest;
use App\Models\Author;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AuthorStoreController extends Controller
{
    public function __invoke(AuthorStoreRequest $request)
    {
        $data = [
            'first_name' => $request['first_name'],
            'second_name' => $request['second_name'],
            'middle_name' => $request['middle_name'],
            'bio' => $request['bio'],
            'country_id' => intval($request['country_id']),
            'date_birthday' => date('Y-m-d', strtotime($request['date_birthday'])),
            'date_death' => date('Y-m-d', strtotime($request['date_death'])),
        ];

//        return response()->json([
//            'success' => true,
//            'message' => 'Author data',
//            'data' => $data,
//        ]);
        $image = explode(',', $request['image'])[1];
        $name = Str::random(240);
        while (File::where('name', $name)->first()) {
            $name = Str::random(240);
        }
        Storage::disk('local')->put($name . '.jpg', base64_decode($image));
        $file = File::create(['name' => $name]);
        $author = Author::create($data);
        return response()->json([
            'success' => true,
            'message' => 'Author data',
            'data' => $data,
        ]);
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class LogoutRequest extends FormRequest
{
    public function rules()
    {
        return [
            'tokenID' => 'required',
        ];

    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Token errors',
            'data' => $validator->errors(),
        ]));
    }

    public function messages(): array
    {
        return [
            'tokenID.required' => 'Необходим id токена!',
        ];
    }
}

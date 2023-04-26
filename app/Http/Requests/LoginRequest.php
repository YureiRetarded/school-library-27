<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class LoginRequest extends FormRequest
{

    public function rules()
    {
        return [
            'login' => 'required|regex:/^[a-zA-Z0-9]+$/',
            'password' => 'required|regex:/^[a-zA-Z0-9!@#$%&{}()?]+$/'
        ];

    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'data' => $validator->errors(),
        ]));
    }

    public function messages(): array
    {
        return [
            'login.required' => 'Поле не может быть пустым!',
            'login.max' => 'Длина логина не может превышать 32 символа!',
            'login.regex' => 'Используйте только цифры и латинские буквы!',
            'password.required' => 'Поле не может быть пустым!',
            'password.max' => 'Длина пароля не может превышать 64 символа!',
            'password.regex' => 'Используйте только цифры, латинские буквы и спец символы(!@#$%&{}()?)!',
        ];
    }
}

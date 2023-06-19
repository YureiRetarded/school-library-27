<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class RegisterRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'login' => 'required|unique:users|min:6|max:32|regex:/^[a-zA-Z0-9]+$/',
            'first_name' => 'required|min:2|max:16|regex:/^[А-Яа-яЁё]+$/u',
            'second_name' => 'required|min:2|max:16|regex:/^[А-Яа-яЁё]+$/u',
            'password' => 'required|min:6|max:64|regex:/^[a-zA-Z0-9!@#$%&{}()?]+$/',
            'confirm_password' => 'required|min:6,max:64|same:password|regex:/^[a-zA-Z0-9!@#$%&{}()?]+$/',
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
            'login.unique' => 'Логин уже занят!',
            'login.min' => 'Длина логина должна начинаться от 6 символов!',
            'login.max' => 'Длина логина не может превышать 32 символа!',
            'login.regex' => 'Используйте только цифры и латинские буквы!',
            'first_name.required' => 'Поле не может быть пустым!',
            'first_name.min' => 'Длина имени должна начинаться от 2 символов!',
            'first_name.max' => 'Длина имени не может превышать 16 символов!',
            'first_name.regex' => 'Используйте только русские буквы!',
            'second_name.required' => 'Поле не может быть пустым!',
            'second_name.min' => 'Длина фамилии должна начинаться от 2 символов!',
            'second_name.max' => 'Длина фамилии не может превышать 16 символов!',
            'second_name.regex' => 'Используйте только русские буквы!',
            'password.required' => 'Поле не может быть пустым!',
            'password.min' => 'Длина пароля должна начинаться от 6 символов!',
            'password.max' => 'Длина пароля не может превышать 64 символа!',
            'password.regex' => 'Используйте только цифры, латинские буквы и спец символы(!@#$%&{}()?)!',
            'confirm_password.required' => 'Поле не может быть пустым!',
            'confirm_password.min' => 'Длина пароля должна начинаться от 6 символов!',
            'confirm_password.max' => 'Длина пароля не может превышать 64 символа!',
            'confirm_password.same' => 'Пароли должны совпадать!',
            'confirm_password.regex' => 'Используйте только цифры, латинские буквы и спец символы(!@#$%&{}()?)!',
        ];
    }
}

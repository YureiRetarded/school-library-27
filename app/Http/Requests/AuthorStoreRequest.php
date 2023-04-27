<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthorStoreRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'first_name' => 'required|max:32|regex:/^([А-Яа-яЁё-]+\s)*[А-Яа-яЁё-]+$/u',
            'second_name' => 'nullable|max:32|regex:/^([А-Яа-яЁё-]+\s)*[А-Яа-яЁё-]+$/u',
            'middle_name' => 'nullable|max:32|regex:/^([А-Яа-яЁё-]+\s)*[А-Яа-яЁё-]+$/u',
            'bio' => 'nullable|max:65000',
            'country_id' => 'required|integer',
            'date_birthday' => 'nullable|date',
            'date_death' => 'nullable|date',
            'photo' => 'nullable|string'
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
            'name.required' => 'Поле не может быть пустым!',
            'name.unique' => 'Такая страна уже есть!',
            'name.min' => 'Длина наименование страны должна начинаться от 2 символов!',
            'name.max' => 'Длина наименование страны не может превышать 64 символа!',
            'name.regex' => 'Используйте только русские буквы!',
        ];
    }
}

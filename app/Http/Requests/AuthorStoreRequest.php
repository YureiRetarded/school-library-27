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
            'photo' => 'nullable|string',
            'image_delete' => 'nullable|bool',
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
            'first_name.required' => 'Поле не может быть пустым!',
            'first_name.min' => 'Длина имени должна начинаться от 2 символов!',
            'first_name.max' => 'Длина имени не может превышать 32 символа!',
            'first_name.regex' => 'Используйте только русские буквы!',
            'second_name.min' => 'Длина фамилии должна начинаться от 2 символов!',
            'second_name.max' => 'Длина фамилии не может превышать 32 символа!',
            'second_name.regex' => 'Используйте только русские буквы!',
            'middle_name.min' => 'Длина отчества должна начинаться от 2 символов!',
            'middle_name.max' => 'Длина отчества не может превышать 32 символа!',
            'middle_name.regex' => 'Используйте только русские буквы!',
            'bio.max' => 'Длинна биография не может превышать 65000 символов! ',
            'country_id.required' => 'Страна обязательно должна быть выбрана!',
            'country_id.integer' => 'Должен быть идентификатор страны!',

        ];
    }
}

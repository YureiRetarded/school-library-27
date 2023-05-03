<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CategoryRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|unique:countries|min:2|max:64|regex:/^[А-Яа-яЁё ]+$/u'
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

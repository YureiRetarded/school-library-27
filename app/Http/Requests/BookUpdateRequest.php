<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class BookUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|min:2|max:32|regex:/^([А-Яа-яЁё-]+\s)*[А-Яа-яЁё-]+$/u',
            'description' => 'nullable|max:65000',
            'category_id' => 'required|integer',
            'date_created' => 'nullable|date',
            'authors' => 'required|array',
            'photo' => 'nullable|string',
            'pdf' => 'nullable|string',
            'image_delete' => 'nullable|bool',
            'file_delete' => 'nullable|bool',
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
            'name.min' => 'Длина наименования должна начинаться от 2 символов!',
            'name.max' => 'Длина наименования не может превышать 32 символа!',
            'name.regex' => 'Используйте только русские буквы!',
            'description.max' => 'Длинна биография не может превышать 65000 символов! ',
            'category_id.required' => 'Страна обязательно должна быть выбрана!',
            'category_id.integer' => 'Должен быть идентификатор страны!',
            'authors.required' => 'Хотя бы один автор должен быть',
        ];
    }
}

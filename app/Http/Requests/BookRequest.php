<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|max:32|regex:/^([А-Яа-яЁё-]+\s)*[А-Яа-яЁё-]+$/u',
            'description' => 'nullable|max:65000',
            'category_id' => 'required|integer',
            'date_created' => 'nullable|date',
            'authors' => 'required|array',
            'photo' => 'nullable|string',
            'pdf' => 'required|string',
            'image_delete' => 'nullable|bool',
            'file_delete' => 'nullable|bool',
        ];
    }
}

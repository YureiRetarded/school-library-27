<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookGetRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'category_id'=>'nullable|integer',
            'author_id'=>'nullable|array',
            'name'=>'nullable|string',
        ];
    }
}

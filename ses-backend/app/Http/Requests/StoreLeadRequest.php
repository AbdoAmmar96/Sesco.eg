<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreLeadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type'          => ['nullable', 'in:contact,quote'],
            'name'          => ['required', 'string', 'max:120'],
            'company'       => ['nullable', 'string', 'max:120'],
            'email'         => ['required', 'email', 'max:160'],
            'phone'         => ['nullable', 'string', 'max:40'],
            'subject'       => ['nullable', 'string', 'max:160'],
            'interested_in' => ['nullable', 'string', 'max:120'],
            'message'       => ['required', 'string', 'max:5000'],
            // Honeypot: real users never fill this hidden field.
            'website'       => ['prohibited'],
        ];
    }

    public function messages(): array
    {
        return [
            'website.prohibited' => 'Spam detected.',
        ];
    }
}

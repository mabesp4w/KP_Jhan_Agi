<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KecamatanRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $kecamatanId = $this->route('kecamatan')?->id;

        return [
            'nm_kecamatan' => ['required', 'string', 'max:255'],
            'ket' => ['nullable', 'string'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nm_kecamatan.required' => 'Nama kecamatan wajib diisi.',
            'nm_kecamatan.string' => 'Nama kecamatan harus berupa teks.',
            'nm_kecamatan.max' => 'Nama kecamatan maksimal 255 karakter.',
            'ket.string' => 'Keterangan harus berupa teks.',
        ];
    }
}


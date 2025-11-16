<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KelurahanRequest extends FormRequest
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
        $kelurahanId = $this->route('kelurahan');
        
        return [
            'id_kecamatan' => 'required|exists:kecamatan,id',
            'nm_kelurahan' => [
                'required',
                'string',
                'max:255',
                \Illuminate\Validation\Rule::unique('kelurahan', 'nm_kelurahan')
                    ->where('id_kecamatan', $this->id_kecamatan)
                    ->ignore($kelurahanId),
            ],
            'kode_pos' => 'nullable|string|max:10',
            'ket' => 'nullable|string|max:500',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'id_kecamatan.required' => 'Kecamatan wajib dipilih.',
            'id_kecamatan.exists' => 'Kecamatan yang dipilih tidak valid.',
            'nm_kelurahan.required' => 'Nama Kelurahan wajib diisi.',
            'nm_kelurahan.unique' => 'Nama Kelurahan sudah ada di kecamatan tersebut.',
            'nm_kelurahan.string' => 'Nama Kelurahan harus berupa teks.',
            'nm_kelurahan.max' => 'Nama Kelurahan tidak boleh lebih dari 255 karakter.',
            'kode_pos.string' => 'Kode Pos harus berupa teks.',
            'kode_pos.max' => 'Kode Pos tidak boleh lebih dari 10 karakter.',
            'ket.string' => 'Keterangan harus berupa teks.',
            'ket.max' => 'Keterangan tidak boleh lebih dari 500 karakter.',
        ];
    }
}


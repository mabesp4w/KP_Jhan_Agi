<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SekolahRequest extends FormRequest
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
        $sekolahId = $this->route('sekolah');

        return [
            'npsn' => [
                'required',
                'string',
                'max:255',
                Rule::unique('sekolah', 'npsn')->ignore($sekolahId),
            ],
            'nm_sekolah' => 'required|string|max:255',
            'id_kelurahan' => 'required|exists:kelurahan,id',
            'alamat' => 'required|string|max:500',
            'no_telp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'thn_berdiri' => 'nullable|integer|min:1900|max:' . date('Y'),
            'status_sekolah' => 'required|in:aktif,tidak_aktif',
            'akreditasi' => 'required|in:A,B,C,Belum',
            'tgl_akreditasi' => 'nullable|date',
            'ket' => 'nullable|string|max:1000',
            'foto_utama' => 'nullable|string|max:255',
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
            'npsn.required' => 'NPSN wajib diisi.',
            'npsn.unique' => 'NPSN sudah terdaftar.',
            'npsn.string' => 'NPSN harus berupa teks.',
            'npsn.max' => 'NPSN tidak boleh lebih dari 255 karakter.',
            'nm_sekolah.required' => 'Nama Sekolah wajib diisi.',
            'nm_sekolah.string' => 'Nama Sekolah harus berupa teks.',
            'nm_sekolah.max' => 'Nama Sekolah tidak boleh lebih dari 255 karakter.',
            'id_kelurahan.required' => 'Kelurahan wajib dipilih.',
            'id_kelurahan.exists' => 'Kelurahan yang dipilih tidak valid.',
            'alamat.required' => 'Alamat wajib diisi.',
            'alamat.string' => 'Alamat harus berupa teks.',
            'alamat.max' => 'Alamat tidak boleh lebih dari 500 karakter.',
            'no_telp.string' => 'No. Telepon harus berupa teks.',
            'no_telp.max' => 'No. Telepon tidak boleh lebih dari 20 karakter.',
            'email.email' => 'Email harus berupa format email yang valid.',
            'email.max' => 'Email tidak boleh lebih dari 255 karakter.',
            'website.url' => 'Website harus berupa URL yang valid.',
            'website.max' => 'Website tidak boleh lebih dari 255 karakter.',
            'latitude.required' => 'Latitude wajib diisi.',
            'latitude.numeric' => 'Latitude harus berupa angka.',
            'latitude.between' => 'Latitude harus antara -90 dan 90.',
            'longitude.required' => 'Longitude wajib diisi.',
            'longitude.numeric' => 'Longitude harus berupa angka.',
            'longitude.between' => 'Longitude harus antara -180 dan 180.',
            'thn_berdiri.integer' => 'Tahun Berdiri harus berupa angka.',
            'thn_berdiri.min' => 'Tahun Berdiri tidak boleh kurang dari 1900.',
            'thn_berdiri.max' => 'Tahun Berdiri tidak boleh lebih dari tahun sekarang.',
            'status_sekolah.required' => 'Status Sekolah wajib dipilih.',
            'status_sekolah.in' => 'Status Sekolah harus Aktif atau Tidak Aktif.',
            'akreditasi.required' => 'Akreditasi wajib dipilih.',
            'akreditasi.in' => 'Akreditasi harus A, B, C, atau Belum.',
            'tgl_akreditasi.date' => 'Tanggal Akreditasi harus berupa tanggal yang valid.',
            'ket.string' => 'Keterangan harus berupa teks.',
            'ket.max' => 'Keterangan tidak boleh lebih dari 1000 karakter.',
            'foto_utama.string' => 'Foto Utama harus berupa teks.',
            'foto_utama.max' => 'Foto Utama tidak boleh lebih dari 255 karakter.',
        ];
    }
}


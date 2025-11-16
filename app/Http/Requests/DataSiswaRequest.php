<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DataSiswaRequest extends FormRequest
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
        $dataSiswaId = $this->route('data_siswa');

        return [
            'id_sekolah' => 'required|exists:sekolah,id',
            'thn_ajaran' => [
                'required',
                'string',
                'regex:/^\d{4}\/\d{4}$/',
                Rule::unique('data_siswa', 'thn_ajaran')
                    ->where('id_sekolah', $this->id_sekolah)
                    ->ignore($dataSiswaId),
            ],
            'jml_kelas_7' => 'required|integer|min:0',
            'jml_siswa_l_7' => 'required|integer|min:0',
            'jml_siswa_p_7' => 'required|integer|min:0',
            'jml_kelas_8' => 'required|integer|min:0',
            'jml_siswa_l_8' => 'required|integer|min:0',
            'jml_siswa_p_8' => 'required|integer|min:0',
            'jml_kelas_9' => 'required|integer|min:0',
            'jml_siswa_l_9' => 'required|integer|min:0',
            'jml_siswa_p_9' => 'required|integer|min:0',
            'ket' => 'nullable|string|max:1000',
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
            'id_sekolah.required' => 'Sekolah wajib dipilih.',
            'id_sekolah.exists' => 'Sekolah yang dipilih tidak valid.',
            'thn_ajaran.required' => 'Tahun Ajaran wajib diisi.',
            'thn_ajaran.regex' => 'Format Tahun Ajaran harus 2024/2025.',
            'thn_ajaran.unique' => 'Data siswa untuk sekolah dan tahun ajaran ini sudah ada.',
            'jml_kelas_7.required' => 'Jumlah Kelas 7 wajib diisi.',
            'jml_kelas_7.integer' => 'Jumlah Kelas 7 harus berupa angka.',
            'jml_kelas_7.min' => 'Jumlah Kelas 7 tidak boleh kurang dari 0.',
            'jml_siswa_l_7.required' => 'Jumlah Siswa Laki-laki Kelas 7 wajib diisi.',
            'jml_siswa_l_7.integer' => 'Jumlah Siswa Laki-laki Kelas 7 harus berupa angka.',
            'jml_siswa_l_7.min' => 'Jumlah Siswa Laki-laki Kelas 7 tidak boleh kurang dari 0.',
            'jml_siswa_p_7.required' => 'Jumlah Siswa Perempuan Kelas 7 wajib diisi.',
            'jml_siswa_p_7.integer' => 'Jumlah Siswa Perempuan Kelas 7 harus berupa angka.',
            'jml_siswa_p_7.min' => 'Jumlah Siswa Perempuan Kelas 7 tidak boleh kurang dari 0.',
            'jml_kelas_8.required' => 'Jumlah Kelas 8 wajib diisi.',
            'jml_kelas_8.integer' => 'Jumlah Kelas 8 harus berupa angka.',
            'jml_kelas_8.min' => 'Jumlah Kelas 8 tidak boleh kurang dari 0.',
            'jml_siswa_l_8.required' => 'Jumlah Siswa Laki-laki Kelas 8 wajib diisi.',
            'jml_siswa_l_8.integer' => 'Jumlah Siswa Laki-laki Kelas 8 harus berupa angka.',
            'jml_siswa_l_8.min' => 'Jumlah Siswa Laki-laki Kelas 8 tidak boleh kurang dari 0.',
            'jml_siswa_p_8.required' => 'Jumlah Siswa Perempuan Kelas 8 wajib diisi.',
            'jml_siswa_p_8.integer' => 'Jumlah Siswa Perempuan Kelas 8 harus berupa angka.',
            'jml_siswa_p_8.min' => 'Jumlah Siswa Perempuan Kelas 8 tidak boleh kurang dari 0.',
            'jml_kelas_9.required' => 'Jumlah Kelas 9 wajib diisi.',
            'jml_kelas_9.integer' => 'Jumlah Kelas 9 harus berupa angka.',
            'jml_kelas_9.min' => 'Jumlah Kelas 9 tidak boleh kurang dari 0.',
            'jml_siswa_l_9.required' => 'Jumlah Siswa Laki-laki Kelas 9 wajib diisi.',
            'jml_siswa_l_9.integer' => 'Jumlah Siswa Laki-laki Kelas 9 harus berupa angka.',
            'jml_siswa_l_9.min' => 'Jumlah Siswa Laki-laki Kelas 9 tidak boleh kurang dari 0.',
            'jml_siswa_p_9.required' => 'Jumlah Siswa Perempuan Kelas 9 wajib diisi.',
            'jml_siswa_p_9.integer' => 'Jumlah Siswa Perempuan Kelas 9 harus berupa angka.',
            'jml_siswa_p_9.min' => 'Jumlah Siswa Perempuan Kelas 9 tidak boleh kurang dari 0.',
            'ket.string' => 'Keterangan harus berupa teks.',
            'ket.max' => 'Keterangan tidak boleh lebih dari 1000 karakter.',
        ];
    }
}


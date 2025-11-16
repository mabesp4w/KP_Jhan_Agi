<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DataGtkRequest extends FormRequest
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
        $dataGtkId = $this->route('data_gtk');

        return [
            'id_sekolah' => 'required|exists:sekolah,id',
            'thn_ajaran' => [
                'required',
                'string',
                'regex:/^\d{4}\/\d{4}$/',
                Rule::unique('data_gtk', 'thn_ajaran')
                    ->where('id_sekolah', $this->id_sekolah)
                    ->ignore($dataGtkId),
            ],
            'jml_guru_pns' => 'required|integer|min:0',
            'jml_guru_honor' => 'required|integer|min:0',
            'jml_guru_kontrak' => 'required|integer|min:0',
            'jml_guru_s1' => 'required|integer|min:0',
            'jml_guru_s2' => 'required|integer|min:0',
            'jml_guru_sertifikasi' => 'required|integer|min:0',
            'jml_tendik_pns' => 'required|integer|min:0',
            'jml_tendik_honor' => 'required|integer|min:0',
            'jml_tendik_kontrak' => 'required|integer|min:0',
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
            'thn_ajaran.unique' => 'Data GTK untuk sekolah dan tahun ajaran ini sudah ada.',
            'jml_guru_pns.required' => 'Jumlah Guru PNS wajib diisi.',
            'jml_guru_pns.integer' => 'Jumlah Guru PNS harus berupa angka.',
            'jml_guru_pns.min' => 'Jumlah Guru PNS tidak boleh kurang dari 0.',
            'jml_guru_honor.required' => 'Jumlah Guru Honor wajib diisi.',
            'jml_guru_honor.integer' => 'Jumlah Guru Honor harus berupa angka.',
            'jml_guru_honor.min' => 'Jumlah Guru Honor tidak boleh kurang dari 0.',
            'jml_guru_kontrak.required' => 'Jumlah Guru Kontrak wajib diisi.',
            'jml_guru_kontrak.integer' => 'Jumlah Guru Kontrak harus berupa angka.',
            'jml_guru_kontrak.min' => 'Jumlah Guru Kontrak tidak boleh kurang dari 0.',
            'jml_guru_s1.required' => 'Jumlah Guru S1 wajib diisi.',
            'jml_guru_s1.integer' => 'Jumlah Guru S1 harus berupa angka.',
            'jml_guru_s1.min' => 'Jumlah Guru S1 tidak boleh kurang dari 0.',
            'jml_guru_s2.required' => 'Jumlah Guru S2 wajib diisi.',
            'jml_guru_s2.integer' => 'Jumlah Guru S2 harus berupa angka.',
            'jml_guru_s2.min' => 'Jumlah Guru S2 tidak boleh kurang dari 0.',
            'jml_guru_sertifikasi.required' => 'Jumlah Guru Sertifikasi wajib diisi.',
            'jml_guru_sertifikasi.integer' => 'Jumlah Guru Sertifikasi harus berupa angka.',
            'jml_guru_sertifikasi.min' => 'Jumlah Guru Sertifikasi tidak boleh kurang dari 0.',
            'jml_tendik_pns.required' => 'Jumlah Tendik PNS wajib diisi.',
            'jml_tendik_pns.integer' => 'Jumlah Tendik PNS harus berupa angka.',
            'jml_tendik_pns.min' => 'Jumlah Tendik PNS tidak boleh kurang dari 0.',
            'jml_tendik_honor.required' => 'Jumlah Tendik Honor wajib diisi.',
            'jml_tendik_honor.integer' => 'Jumlah Tendik Honor harus berupa angka.',
            'jml_tendik_honor.min' => 'Jumlah Tendik Honor tidak boleh kurang dari 0.',
            'jml_tendik_kontrak.required' => 'Jumlah Tendik Kontrak wajib diisi.',
            'jml_tendik_kontrak.integer' => 'Jumlah Tendik Kontrak harus berupa angka.',
            'jml_tendik_kontrak.min' => 'Jumlah Tendik Kontrak tidak boleh kurang dari 0.',
            'ket.string' => 'Keterangan harus berupa teks.',
            'ket.max' => 'Keterangan tidak boleh lebih dari 1000 karakter.',
        ];
    }
}


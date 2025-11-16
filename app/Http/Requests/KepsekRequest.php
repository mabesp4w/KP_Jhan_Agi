<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class KepsekRequest extends FormRequest
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
        return [
            'id_sekolah' => 'required|exists:sekolah,id',
            'nm_kepsek' => 'required|string|max:255',
            'nip' => 'nullable|string|max:255',
            'no_telp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'jenis_kelamin' => 'nullable|in:L,P',
            'pendidikan_terakhir' => 'nullable|string|max:255',
            'tgl_mulai' => 'required|date',
            'tgl_selesai' => 'nullable|date|after_or_equal:tgl_mulai',
            'aktif' => 'boolean',
            'foto' => 'nullable|string|max:255',
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
            'nm_kepsek.required' => 'Nama Kepala Sekolah wajib diisi.',
            'nm_kepsek.string' => 'Nama Kepala Sekolah harus berupa teks.',
            'nm_kepsek.max' => 'Nama Kepala Sekolah tidak boleh lebih dari 255 karakter.',
            'nip.string' => 'NIP harus berupa teks.',
            'nip.max' => 'NIP tidak boleh lebih dari 255 karakter.',
            'no_telp.string' => 'No. Telepon harus berupa teks.',
            'no_telp.max' => 'No. Telepon tidak boleh lebih dari 20 karakter.',
            'email.email' => 'Email harus berupa format email yang valid.',
            'email.max' => 'Email tidak boleh lebih dari 255 karakter.',
            'jenis_kelamin.in' => 'Jenis Kelamin harus Laki-laki atau Perempuan.',
            'pendidikan_terakhir.string' => 'Pendidikan Terakhir harus berupa teks.',
            'pendidikan_terakhir.max' => 'Pendidikan Terakhir tidak boleh lebih dari 255 karakter.',
            'tgl_mulai.required' => 'Tanggal Mulai wajib diisi.',
            'tgl_mulai.date' => 'Tanggal Mulai harus berupa tanggal yang valid.',
            'tgl_selesai.date' => 'Tanggal Selesai harus berupa tanggal yang valid.',
            'tgl_selesai.after_or_equal' => 'Tanggal Selesai harus sama atau setelah Tanggal Mulai.',
            'aktif.boolean' => 'Status Aktif harus berupa true atau false.',
            'foto.string' => 'Foto harus berupa teks.',
            'foto.max' => 'Foto tidak boleh lebih dari 255 karakter.',
            'ket.string' => 'Keterangan harus berupa teks.',
            'ket.max' => 'Keterangan tidak boleh lebih dari 1000 karakter.',
        ];
    }
}


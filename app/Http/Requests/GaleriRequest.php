<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GaleriRequest extends FormRequest
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
        $galeriId = $this->route('galeri');

        return [
            'id_sekolah' => 'required|exists:sekolah,id',
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string|max:1000',
            'file_foto' => $galeriId ? 'nullable|image|mimes:jpeg,jpg,png,gif,webp|max:5120' : 'required|image|mimes:jpeg,jpg,png,gif,webp|max:5120',
            'kategori' => 'required|in:gedung,kegiatan,prestasi,lainnya',
            'urutan' => 'nullable|integer|min:0',
            'tampilkan' => 'boolean',
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
            'judul.required' => 'Judul wajib diisi.',
            'judul.string' => 'Judul harus berupa teks.',
            'judul.max' => 'Judul tidak boleh lebih dari 255 karakter.',
            'deskripsi.string' => 'Deskripsi harus berupa teks.',
            'deskripsi.max' => 'Deskripsi tidak boleh lebih dari 1000 karakter.',
            'file_foto.required' => 'File foto wajib diupload.',
            'file_foto.image' => 'File harus berupa gambar.',
            'file_foto.mimes' => 'File harus berformat jpeg, jpg, png, gif, atau webp.',
            'file_foto.max' => 'Ukuran file tidak boleh lebih dari 5MB.',
            'kategori.required' => 'Kategori wajib dipilih.',
            'kategori.in' => 'Kategori harus Gedung, Kegiatan, Prestasi, atau Lainnya.',
            'urutan.integer' => 'Urutan harus berupa angka.',
            'urutan.min' => 'Urutan tidak boleh kurang dari 0.',
            'tampilkan.boolean' => 'Status Tampilkan harus berupa true atau false.',
        ];
    }
}


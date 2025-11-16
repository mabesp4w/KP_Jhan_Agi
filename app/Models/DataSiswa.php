<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DataSiswa extends Model
{
    use HasFactory;

    protected $table = 'data_siswa';

    protected $fillable = [
        'id_sekolah',
        'thn_ajaran',
        'jml_kelas_7',
        'jml_siswa_l_7',
        'jml_siswa_p_7',
        'jml_kelas_8',
        'jml_siswa_l_8',
        'jml_siswa_p_8',
        'jml_kelas_9',
        'jml_siswa_l_9',
        'jml_siswa_p_9',
        'ket',
    ];

    protected $casts = [
        'jml_kelas_7' => 'integer',
        'jml_siswa_l_7' => 'integer',
        'jml_siswa_p_7' => 'integer',
        'jml_kelas_8' => 'integer',
        'jml_siswa_l_8' => 'integer',
        'jml_siswa_p_8' => 'integer',
        'jml_kelas_9' => 'integer',
        'jml_siswa_l_9' => 'integer',
        'jml_siswa_p_9' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the sekolah that owns the data siswa.
     */
    public function sekolah(): BelongsTo
    {
        return $this->belongsTo(Sekolah::class, 'id_sekolah');
    }
}


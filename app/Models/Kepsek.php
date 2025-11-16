<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Kepsek extends Model
{
    use HasFactory;

    protected $table = 'kepsek';

    protected $fillable = [
        'id_sekolah',
        'nm_kepsek',
        'nip',
        'no_telp',
        'email',
        'jenis_kelamin',
        'pendidikan_terakhir',
        'tgl_mulai',
        'tgl_selesai',
        'aktif',
        'foto',
        'ket',
    ];

    protected $casts = [
        'tgl_mulai' => 'date',
        'tgl_selesai' => 'date',
        'aktif' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the sekolah that owns the kepsek.
     */
    public function sekolah(): BelongsTo
    {
        return $this->belongsTo(Sekolah::class, 'id_sekolah');
    }
}


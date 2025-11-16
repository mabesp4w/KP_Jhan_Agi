<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sekolah extends Model
{
    use HasFactory;

    protected $table = 'sekolah';

    protected $fillable = [
        'npsn',
        'nm_sekolah',
        'id_kelurahan',
        'alamat',
        'no_telp',
        'email',
        'website',
        'latitude',
        'longitude',
        'thn_berdiri',
        'status_sekolah',
        'akreditasi',
        'tgl_akreditasi',
        'ket',
        'foto_utama',
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'thn_berdiri' => 'integer',
        'tgl_akreditasi' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the kelurahan that owns the sekolah.
     */
    public function kelurahan(): BelongsTo
    {
        return $this->belongsTo(Kelurahan::class, 'id_kelurahan');
    }

    /**
     * Get the kepseks for the sekolah.
     */
    public function kepseks(): HasMany
    {
        return $this->hasMany(Kepsek::class, 'id_sekolah');
    }

    /**
     * Get the galeris for the sekolah.
     */
    public function galeris(): HasMany
    {
        return $this->hasMany(Galeri::class, 'id_sekolah');
    }

    /**
     * Get the data siswa for the sekolah.
     */
    public function dataSiswa(): HasMany
    {
        return $this->hasMany(DataSiswa::class, 'id_sekolah');
    }

    /**
     * Get the data gtk for the sekolah.
     */
    public function dataGtk(): HasMany
    {
        return $this->hasMany(DataGtk::class, 'id_sekolah');
    }
}


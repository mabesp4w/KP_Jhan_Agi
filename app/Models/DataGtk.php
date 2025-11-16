<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DataGtk extends Model
{
    use HasFactory;

    protected $table = 'data_gtk';

    protected $fillable = [
        'id_sekolah',
        'thn_ajaran',
        'jml_guru_pns',
        'jml_guru_honor',
        'jml_guru_kontrak',
        'jml_guru_s1',
        'jml_guru_s2',
        'jml_guru_sertifikasi',
        'jml_tendik_pns',
        'jml_tendik_honor',
        'jml_tendik_kontrak',
        'ket',
    ];

    protected $casts = [
        'jml_guru_pns' => 'integer',
        'jml_guru_honor' => 'integer',
        'jml_guru_kontrak' => 'integer',
        'jml_guru_s1' => 'integer',
        'jml_guru_s2' => 'integer',
        'jml_guru_sertifikasi' => 'integer',
        'jml_tendik_pns' => 'integer',
        'jml_tendik_honor' => 'integer',
        'jml_tendik_kontrak' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the sekolah that owns the data gtk.
     */
    public function sekolah(): BelongsTo
    {
        return $this->belongsTo(Sekolah::class, 'id_sekolah');
    }
}


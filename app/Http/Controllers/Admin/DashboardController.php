<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DataGtk;
use App\Models\DataSiswa;
use App\Models\Galeri;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use App\Models\Kepsek;
use App\Models\Sekolah;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index(): Response
    {
        // Ambil tahun ajaran terbaru dari database
        $thnAjaranTerbaruGtk = DataGtk::orderBy('thn_ajaran', 'desc')->value('thn_ajaran');
        $thnAjaranTerbaruSiswa = DataSiswa::orderBy('thn_ajaran', 'desc')->value('thn_ajaran');
        
        // Statistik utama
        $stats = [
            'total_sekolah' => Sekolah::count(),
            'total_sekolah_aktif' => Sekolah::where('status_sekolah', 'aktif')->count(),
            'total_gtk' => $thnAjaranTerbaruGtk 
                ? (int) DB::table('data_gtk')
                    ->where('thn_ajaran', $thnAjaranTerbaruGtk)
                    ->selectRaw('SUM(jml_guru_pns + jml_guru_honor + jml_guru_kontrak + jml_tendik_pns + jml_tendik_honor + jml_tendik_kontrak) as total')
                    ->value('total') ?? 0
                : 0,
            'total_siswa' => $thnAjaranTerbaruSiswa
                ? (int) DB::table('data_siswa')
                    ->where('thn_ajaran', $thnAjaranTerbaruSiswa)
                    ->selectRaw('SUM(jml_siswa_l_7 + jml_siswa_p_7 + jml_siswa_l_8 + jml_siswa_p_8 + jml_siswa_l_9 + jml_siswa_p_9) as total')
                    ->value('total') ?? 0
                : 0,
            'total_kecamatan' => Kecamatan::count(),
            'total_kelurahan' => Kelurahan::count(),
            'total_data_siswa' => DataSiswa::count(),
            'total_galeri' => Galeri::where('tampilkan', true)->count(),
            'total_kepsek' => Kepsek::where('aktif', true)->count(),
        ];

        // Data sekolah terbaru
        $sekolahTerbaru = Sekolah::with(['kelurahan.kecamatan'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Statistik per kecamatan
        $statistikKecamatan = Kecamatan::withCount('kelurahan')
            ->get()
            ->map(function ($kecamatan) {
                $kecamatan->jumlah_sekolah = Sekolah::whereHas('kelurahan', function ($q) use ($kecamatan) {
                    $q->where('id_kecamatan', $kecamatan->id);
                })->where('status_sekolah', 'aktif')->count();
                return $kecamatan;
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'sekolahTerbaru' => $sekolahTerbaru,
            'statistikKecamatan' => $statistikKecamatan,
        ]);
    }
}


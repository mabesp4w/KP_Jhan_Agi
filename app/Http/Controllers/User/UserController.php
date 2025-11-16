<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\DataGtk;
use App\Models\DataSiswa;
use App\Models\Galeri;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use App\Models\Sekolah;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display the user dashboard.
     */
    public function dashboard(): Response
    {
        $stats = [
            'total_sekolah' => Sekolah::where('status_sekolah', 'aktif')->count(),
            'total_galeri' => Galeri::where('tampilkan', true)->count(),
            'total_kecamatan' => Kecamatan::count(),
            'total_kelurahan' => Kelurahan::count(),
        ];

        return Inertia::render('User/Dashboard', [
            'stats' => $stats,
        ]);
    }

    /**
     * Display a listing of sekolah.
     */
    public function sekolahIndex(Request $request): Response
    {
        $query = Sekolah::with(['kelurahan.kecamatan'])
            ->where('status_sekolah', 'aktif')
            ->orderBy('nm_sekolah');

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nm_sekolah', 'like', "%{$search}%")
                    ->orWhere('npsn', 'like', "%{$search}%")
                    ->orWhere('alamat', 'like', "%{$search}%");
            });
        }

        // Filter by kecamatan
        if ($request->has('kecamatan') && $request->kecamatan) {
            $query->whereHas('kelurahan', function ($q) use ($request) {
                $q->where('id_kecamatan', $request->kecamatan);
            });
        }

        // Filter by kelurahan
        if ($request->has('kelurahan') && $request->kelurahan) {
            $query->where('id_kelurahan', $request->kelurahan);
        }

        // Filter by akreditasi
        if ($request->has('akreditasi') && $request->akreditasi) {
            $query->where('akreditasi', $request->akreditasi);
        }

        $sekolahs = $query->paginate(12)->withQueryString();

        // Get filter options
        $kecamatans = Kecamatan::orderBy('nm_kecamatan')->get();
        $kelurahans = Kelurahan::with('kecamatan')->orderBy('nm_kelurahan')->get();

        // Ambil sekolah yang memiliki koordinat untuk ditampilkan di peta
        // Menerapkan filter yang sama dengan query utama
        $mapQuery = Sekolah::with(['kelurahan.kecamatan'])
            ->where('status_sekolah', 'aktif')
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->where('latitude', '!=', '')
            ->where('longitude', '!=', '');

        // Terapkan search filter
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $mapQuery->where(function ($q) use ($search) {
                $q->where('nm_sekolah', 'like', "%{$search}%")
                    ->orWhere('npsn', 'like', "%{$search}%")
                    ->orWhere('alamat', 'like', "%{$search}%");
            });
        }

        // Terapkan filter kecamatan
        if ($request->has('kecamatan') && $request->kecamatan) {
            $mapQuery->whereHas('kelurahan', function ($q) use ($request) {
                $q->where('id_kecamatan', $request->kecamatan);
            });
        }

        // Terapkan filter kelurahan
        if ($request->has('kelurahan') && $request->kelurahan) {
            $mapQuery->where('id_kelurahan', $request->kelurahan);
        }

        // Terapkan filter akreditasi
        if ($request->has('akreditasi') && $request->akreditasi) {
            $mapQuery->where('akreditasi', $request->akreditasi);
        }

        $sekolahsForMap = $mapQuery
            ->select('id', 'nm_sekolah', 'npsn', 'latitude', 'longitude', 'alamat', 'id_kelurahan', 'foto_utama', 'no_telp', 'email', 'website', 'thn_berdiri', 'akreditasi')
            ->get();

        return Inertia::render('User/Sekolah/Index', [
            'sekolahs' => $sekolahs,
            'kecamatans' => $kecamatans,
            'kelurahans' => $kelurahans,
            'filters' => $request->only(['search', 'kecamatan', 'kelurahan', 'akreditasi']),
            'sekolahsForMap' => $sekolahsForMap,
        ]);
    }

    /**
     * Display the specified sekolah.
     */
    public function sekolahShow(Sekolah $sekolah): Response
    {
        $sekolah->load(['kelurahan.kecamatan']);

        // Get kepala sekolah aktif
        $kepsek = $sekolah->kepseks()->where('aktif', true)->first();

        // Get galeri
        $galeris = $sekolah->galeris()->where('tampilkan', true)->orderBy('urutan')->orderBy('created_at', 'desc')->get();

        // Get data siswa (ambil yang terbaru berdasarkan tahun ajaran)
        $dataSiswa = $sekolah->dataSiswa()->orderBy('thn_ajaran', 'desc')->get();

        // Get data GTK (ambil yang terbaru berdasarkan tahun ajaran)
        $dataGtk = $sekolah->dataGtk()->orderBy('thn_ajaran', 'desc')->get();

        // Ambil semua sekolah yang memiliki koordinat untuk ditampilkan di peta (termasuk sekolah ini)
        $sekolahsForMap = Sekolah::with(['kelurahan.kecamatan'])
            ->where('status_sekolah', 'aktif')
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->where('latitude', '!=', '')
            ->where('longitude', '!=', '')
            ->select('id', 'nm_sekolah', 'npsn', 'latitude', 'longitude', 'alamat', 'id_kelurahan', 'foto_utama', 'no_telp', 'email', 'website', 'thn_berdiri', 'akreditasi')
            ->get();

        return Inertia::render('User/Sekolah/Show', [
            'sekolah' => $sekolah,
            'kepsek' => $kepsek,
            'galeris' => $galeris,
            'sekolahsForMap' => $sekolahsForMap,
            'dataSiswa' => $dataSiswa,
            'dataGtk' => $dataGtk,
        ]);
    }

    /**
     * Display a listing of galeri.
     */
    public function galeriIndex(Request $request): Response
    {
        $query = Galeri::with(['sekolah'])
            ->where('tampilkan', true)
            ->orderBy('urutan')
            ->orderBy('created_at', 'desc');

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('deskripsi', 'like', "%{$search}%")
                    ->orWhereHas('sekolah', function ($q) use ($search) {
                        $q->where('nm_sekolah', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by sekolah
        if ($request->has('sekolah') && $request->sekolah) {
            $query->where('id_sekolah', $request->sekolah);
        }

        // Filter by kategori
        if ($request->has('kategori') && $request->kategori) {
            $query->where('kategori', $request->kategori);
        }

        $galeris = $query->paginate(12)->withQueryString();

        // Get filter options
        $sekolahs = Sekolah::where('status_sekolah', 'aktif')->orderBy('nm_sekolah')->get();

        return Inertia::render('User/Galeri/Index', [
            'galeris' => $galeris,
            'sekolahs' => $sekolahs,
            'filters' => $request->only(['search', 'sekolah', 'kategori']),
        ]);
    }

    /**
     * Display the tentang page.
     */
    public function tentang(): Response
    {
        return Inertia::render('User/Tentang');
    }
}


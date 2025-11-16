<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataSiswaRequest;
use App\Models\DataSiswa;
use App\Models\Sekolah;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DataSiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = DataSiswa::with(['sekolah.kelurahan.kecamatan']);

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('thn_ajaran', 'like', "%{$search}%")
                    ->orWhereHas('sekolah', function ($q) use ($search) {
                        $q->where('nm_sekolah', 'like', "%{$search}%")
                            ->orWhere('npsn', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by sekolah
        if ($request->has('sekolah') && $request->sekolah) {
            $query->where('id_sekolah', $request->sekolah);
        }

        // Filter by tahun ajaran
        if ($request->has('thn_ajaran') && $request->thn_ajaran) {
            $query->where('thn_ajaran', $request->thn_ajaran);
        }

        // Pagination
        $dataSiswas = $query->orderBy('thn_ajaran', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Get all sekolah for filter
        $sekolahs = Sekolah::orderBy('nm_sekolah')->get();

        return Inertia::render('Admin/DataSiswa/Index', [
            'dataSiswas' => $dataSiswas,
            'sekolahs' => $sekolahs,
            'filters' => $request->only(['search', 'sekolah', 'thn_ajaran']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $sekolahs = Sekolah::orderBy('nm_sekolah')->get();

        return Inertia::render('Admin/DataSiswa/Form', [
            'sekolahs' => $sekolahs,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DataSiswaRequest $request): RedirectResponse
    {
        DataSiswa::create($request->validated());

        return redirect()->route('admin.data-siswa.index')
            ->with('success', 'Data Siswa berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DataSiswa $dataSiswa): Response
    {
        $dataSiswa->load('sekolah.kelurahan.kecamatan');
        $sekolahs = Sekolah::orderBy('nm_sekolah')->get();

        return Inertia::render('Admin/DataSiswa/Form', [
            'dataSiswa' => $dataSiswa,
            'sekolahs' => $sekolahs,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DataSiswaRequest $request, DataSiswa $dataSiswa): RedirectResponse
    {
        $dataSiswa->update($request->validated());

        return redirect()->route('admin.data-siswa.index')
            ->with('success', 'Data Siswa berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DataSiswa $dataSiswa): RedirectResponse
    {
        $thnAjaran = $dataSiswa->thn_ajaran;
        $dataSiswa->delete();

        return redirect()->route('admin.data-siswa.index')
            ->with('success', "Berhasil menghapus data siswa tahun ajaran {$thnAjaran}.");
    }
}


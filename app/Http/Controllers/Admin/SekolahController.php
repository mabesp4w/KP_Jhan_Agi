<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SekolahRequest;
use App\Models\Sekolah;
use App\Models\Kelurahan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SekolahController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Sekolah::with(['kelurahan.kecamatan']);

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('npsn', 'like', "%{$search}%")
                    ->orWhere('nm_sekolah', 'like', "%{$search}%")
                    ->orWhere('alamat', 'like', "%{$search}%")
                    ->orWhere('no_telp', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhereHas('kelurahan', function ($q) use ($search) {
                        $q->where('nm_kelurahan', 'like', "%{$search}%")
                            ->orWhereHas('kecamatan', function ($q) use ($search) {
                                $q->where('nm_kecamatan', 'like', "%{$search}%");
                            });
                    });
            });
        }

        // Filter by kelurahan
        if ($request->has('kelurahan') && $request->kelurahan) {
            $query->where('id_kelurahan', $request->kelurahan);
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status_sekolah', $request->status);
        }

        // Filter by akreditasi
        if ($request->has('akreditasi') && $request->akreditasi) {
            $query->where('akreditasi', $request->akreditasi);
        }

        // Pagination
        $sekolahs = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Get all kelurahan for filter
        $kelurahans = Kelurahan::with('kecamatan')
            ->orderBy('nm_kelurahan')
            ->get();

        return Inertia::render('Admin/Sekolah/Index', [
            'sekolahs' => $sekolahs,
            'kelurahans' => $kelurahans,
            'filters' => $request->only(['search', 'kelurahan', 'status', 'akreditasi']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $kelurahans = Kelurahan::with('kecamatan')
            ->orderBy('nm_kelurahan')
            ->get();

        // Ambil semua sekolah yang memiliki koordinat untuk ditampilkan di peta
        $sekolahs = Sekolah::whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->where('latitude', '!=', '')
            ->where('longitude', '!=', '')
            ->select('id', 'nm_sekolah', 'latitude', 'longitude', 'alamat')
            ->get();

        return Inertia::render('Admin/Sekolah/Form', [
            'kelurahans' => $kelurahans,
            'sekolahs' => $sekolahs,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SekolahRequest $request): RedirectResponse
    {
        Sekolah::create($request->validated());

        return redirect()->route('admin.sekolah.index')
            ->with('success', 'Sekolah berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sekolah $sekolah): Response
    {
        $sekolah->load('kelurahan.kecamatan');
        $kelurahans = Kelurahan::with('kecamatan')
            ->orderBy('nm_kelurahan')
            ->get();

        // Ambil semua sekolah yang memiliki koordinat untuk ditampilkan di peta
        // Kecuali sekolah yang sedang diedit
        $sekolahs = Sekolah::whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->where('latitude', '!=', '')
            ->where('longitude', '!=', '')
            ->where('id', '!=', $sekolah->id)
            ->select('id', 'nm_sekolah', 'latitude', 'longitude', 'alamat')
            ->get();

        return Inertia::render('Admin/Sekolah/Form', [
            'sekolah' => $sekolah,
            'kelurahans' => $kelurahans,
            'sekolahs' => $sekolahs,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SekolahRequest $request, Sekolah $sekolah): RedirectResponse
    {
        $sekolah->update($request->validated());

        return redirect()->route('admin.sekolah.index')
            ->with('success', 'Sekolah berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sekolah $sekolah): RedirectResponse
    {
        $nmSekolah = $sekolah->nm_sekolah;
        $sekolah->delete();

        return redirect()->route('admin.sekolah.index')
            ->with('success', "Berhasil menghapus data {$nmSekolah}.");
    }
}


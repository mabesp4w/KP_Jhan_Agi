<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\KepsekRequest;
use App\Models\Kepsek;
use App\Models\Sekolah;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KepsekController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Kepsek::with(['sekolah.kelurahan.kecamatan']);

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nm_kepsek', 'like', "%{$search}%")
                    ->orWhere('nip', 'like', "%{$search}%")
                    ->orWhere('no_telp', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('pendidikan_terakhir', 'like', "%{$search}%")
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

        // Filter by aktif
        if ($request->has('aktif') && $request->aktif !== '') {
            $query->where('aktif', $request->aktif === '1' || $request->aktif === 'true');
        }

        // Pagination
        $kepseks = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Get all sekolah for filter
        $sekolahs = Sekolah::orderBy('nm_sekolah')->get();

        return Inertia::render('Admin/Kepsek/Index', [
            'kepseks' => $kepseks,
            'sekolahs' => $sekolahs,
            'filters' => $request->only(['search', 'sekolah', 'aktif']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $sekolahs = Sekolah::orderBy('nm_sekolah')->get();

        return Inertia::render('Admin/Kepsek/Form', [
            'sekolahs' => $sekolahs,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(KepsekRequest $request): RedirectResponse
    {
        Kepsek::create($request->validated());

        return redirect()->route('admin.kepsek.index')
            ->with('success', 'Kepala Sekolah berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kepsek $kepsek): Response
    {
        $kepsek->load('sekolah.kelurahan.kecamatan');
        $sekolahs = Sekolah::orderBy('nm_sekolah')->get();

        return Inertia::render('Admin/Kepsek/Form', [
            'kepsek' => $kepsek,
            'sekolahs' => $sekolahs,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(KepsekRequest $request, Kepsek $kepsek): RedirectResponse
    {
        $kepsek->update($request->validated());

        return redirect()->route('admin.kepsek.index')
            ->with('success', 'Kepala Sekolah berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kepsek $kepsek): RedirectResponse
    {
        $nmKepsek = $kepsek->nm_kepsek;
        $kepsek->delete();

        return redirect()->route('admin.kepsek.index')
            ->with('success', "Berhasil menghapus data {$nmKepsek}.");
    }
}


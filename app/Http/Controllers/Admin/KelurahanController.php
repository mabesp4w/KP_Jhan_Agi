<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\KelurahanRequest;
use App\Models\Kelurahan;
use App\Models\Kecamatan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KelurahanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Kelurahan::with('kecamatan');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nm_kelurahan', 'like', "%{$search}%")
                    ->orWhere('kode_pos', 'like', "%{$search}%")
                    ->orWhere('ket', 'like', "%{$search}%")
                    ->orWhereHas('kecamatan', function ($q) use ($search) {
                        $q->where('nm_kecamatan', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by kecamatan
        if ($request->has('kecamatan') && $request->kecamatan) {
            $query->where('id_kecamatan', $request->kecamatan);
        }

        // Pagination
        $kelurahans = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Get all kecamatan for filter
        $kecamatans = Kecamatan::orderBy('nm_kecamatan')->get();

        return Inertia::render('Admin/Kelurahan/Index', [
            'kelurahans' => $kelurahans,
            'kecamatans' => $kecamatans,
            'filters' => $request->only(['search', 'kecamatan']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $kecamatans = Kecamatan::orderBy('nm_kecamatan')->get();

        return Inertia::render('Admin/Kelurahan/Form', [
            'kecamatans' => $kecamatans,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(KelurahanRequest $request): RedirectResponse
    {
        Kelurahan::create($request->validated());

        return redirect()->route('admin.kelurahan.index')
            ->with('success', 'Kelurahan berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kelurahan $kelurahan): Response
    {
        $kecamatans = Kecamatan::orderBy('nm_kecamatan')->get();

        return Inertia::render('Admin/Kelurahan/Form', [
            'kelurahan' => $kelurahan,
            'kecamatans' => $kecamatans,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(KelurahanRequest $request, Kelurahan $kelurahan): RedirectResponse
    {
        $kelurahan->update($request->validated());

        return redirect()->route('admin.kelurahan.index')
            ->with('success', 'Kelurahan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kelurahan $kelurahan): RedirectResponse
    {
        $nmKelurahan = $kelurahan->nm_kelurahan;
        $kelurahan->delete();

        return redirect()->route('admin.kelurahan.index')
            ->with('success', "Berhasil menghapus data {$nmKelurahan}.");
    }
}


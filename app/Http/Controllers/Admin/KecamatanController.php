<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\KecamatanRequest;
use App\Models\Kecamatan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KecamatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Kecamatan::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nm_kecamatan', 'like', "%{$search}%")
                    ->orWhere('ket', 'like', "%{$search}%");
            });
        }

        // Pagination
        $kecamatans = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Kecamatan/Index', [
            'kecamatans' => $kecamatans,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Kecamatan/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(KecamatanRequest $request): RedirectResponse
    {
        Kecamatan::create($request->validated());

        return redirect()->route('admin.kecamatan.index')
            ->with('success', 'Kecamatan berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kecamatan $kecamatan): Response
    {
        return Inertia::render('Admin/Kecamatan/Form', [
            'kecamatan' => $kecamatan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(KecamatanRequest $request, Kecamatan $kecamatan): RedirectResponse
    {
        $kecamatan->update($request->validated());

        return redirect()->route('admin.kecamatan.index')
            ->with('success', 'Kecamatan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kecamatan $kecamatan): RedirectResponse
    {
        // Check if kecamatan has kelurahan
        if ($kecamatan->kelurahan()->count() > 0) {
            return redirect()->route('admin.kecamatan.index')
                ->with('error', 'Kecamatan tidak dapat dihapus karena masih memiliki kelurahan.');
        }

        $nmKecamatan = $kecamatan->nm_kecamatan;
        $kecamatan->delete();

        return redirect()->route('admin.kecamatan.index')
            ->with('success', "Berhasil menghapus data {$nmKecamatan}.");
    }
}


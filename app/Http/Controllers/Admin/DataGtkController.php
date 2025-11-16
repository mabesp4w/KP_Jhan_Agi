<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataGtkRequest;
use App\Models\DataGtk;
use App\Models\Sekolah;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DataGtkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = DataGtk::with(['sekolah.kelurahan.kecamatan']);

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
        $dataGtks = $query->orderBy('thn_ajaran', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Get all sekolah for filter
        $sekolahs = Sekolah::orderBy('nm_sekolah')->get();

        return Inertia::render('Admin/DataGtk/Index', [
            'dataGtks' => $dataGtks,
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

        return Inertia::render('Admin/DataGtk/Form', [
            'sekolahs' => $sekolahs,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DataGtkRequest $request): RedirectResponse
    {
        DataGtk::create($request->validated());

        return redirect()->route('admin.data-gtk.index')
            ->with('success', 'Data GTK berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DataGtk $dataGtk): Response
    {
        $dataGtk->load('sekolah.kelurahan.kecamatan');
        $sekolahs = Sekolah::orderBy('nm_sekolah')->get();

        return Inertia::render('Admin/DataGtk/Form', [
            'dataGtk' => $dataGtk,
            'sekolahs' => $sekolahs,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DataGtkRequest $request, DataGtk $dataGtk): RedirectResponse
    {
        $dataGtk->update($request->validated());

        return redirect()->route('admin.data-gtk.index')
            ->with('success', 'Data GTK berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DataGtk $dataGtk): RedirectResponse
    {
        $thnAjaran = $dataGtk->thn_ajaran;
        $dataGtk->delete();

        return redirect()->route('admin.data-gtk.index')
            ->with('success', "Berhasil menghapus data GTK tahun ajaran {$thnAjaran}.");
    }
}


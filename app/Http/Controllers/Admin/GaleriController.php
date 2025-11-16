<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\GaleriRequest;
use App\Models\Galeri;
use App\Models\Sekolah;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GaleriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Galeri::with(['sekolah.kelurahan.kecamatan']);

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('deskripsi', 'like', "%{$search}%")
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

        // Filter by kategori
        if ($request->has('kategori') && $request->kategori) {
            $query->where('kategori', $request->kategori);
        }

        // Filter by tampilkan
        if ($request->has('tampilkan') && $request->tampilkan !== '') {
            $query->where('tampilkan', $request->tampilkan === '1' || $request->tampilkan === 'true');
        }

        // Pagination
        $galeris = $query->orderBy('urutan', 'asc')
            ->orderBy('created_at', 'desc')
            ->paginate(12)
            ->withQueryString();

        // Get all sekolah for filter
        $sekolahs = Sekolah::orderBy('nm_sekolah')->get();

        return Inertia::render('Admin/Galeri/Index', [
            'galeris' => $galeris,
            'sekolahs' => $sekolahs,
            'filters' => $request->only(['search', 'sekolah', 'kategori', 'tampilkan']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $sekolahs = Sekolah::orderBy('nm_sekolah')->get();

        return Inertia::render('Admin/Galeri/Form', [
            'sekolahs' => $sekolahs,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(GaleriRequest $request): RedirectResponse
    {
        $data = $request->validated();

        // Handle file upload
        if ($request->hasFile('file_foto')) {
            $file = $request->file('file_foto');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('galeri', $filename, 'public');
            $data['file_foto'] = $path;
        }

        // Set default values
        $data['urutan'] = $data['urutan'] ?? 0;
        $data['tampilkan'] = $request->has('tampilkan') && ($request->tampilkan === '1' || $request->tampilkan === 'true' || $request->tampilkan === true || $request->tampilkan === 1);

        Galeri::create($data);

        return redirect()->route('admin.galeri.index')
            ->with('success', 'Galeri berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Galeri $galeri): Response
    {
        $galeri->load('sekolah.kelurahan.kecamatan');
        $sekolahs = Sekolah::orderBy('nm_sekolah')->get();

        return Inertia::render('Admin/Galeri/Form', [
            'galeri' => $galeri,
            'sekolahs' => $sekolahs,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(GaleriRequest $request, Galeri $galeri): RedirectResponse
    {
        $data = $request->validated();

        // Handle file upload if new file is provided
        if ($request->hasFile('file_foto')) {
            // Delete old file
            if ($galeri->file_foto && Storage::disk('public')->exists($galeri->file_foto)) {
                Storage::disk('public')->delete($galeri->file_foto);
            }

            // Upload new file
            $file = $request->file('file_foto');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('galeri', $filename, 'public');
            $data['file_foto'] = $path;
        } else {
            // Keep existing file
            unset($data['file_foto']);
        }

        // Set default values
        $data['urutan'] = $data['urutan'] ?? 0;
        $data['tampilkan'] = $request->has('tampilkan') && ($request->tampilkan === '1' || $request->tampilkan === 'true' || $request->tampilkan === true || $request->tampilkan === 1);

        $galeri->update($data);

        return redirect()->route('admin.galeri.index')
            ->with('success', 'Galeri berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Galeri $galeri): RedirectResponse
    {
        // Delete file
        if ($galeri->file_foto && Storage::disk('public')->exists($galeri->file_foto)) {
            Storage::disk('public')->delete($galeri->file_foto);
        }

        $judul = $galeri->judul;
        $galeri->delete();

        return redirect()->route('admin.galeri.index')
            ->with('success', "Berhasil menghapus data {$judul}.");
    }
}


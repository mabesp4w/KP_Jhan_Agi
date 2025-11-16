<?php

namespace Database\Seeders;

use App\Models\Galeri;
use App\Models\Sekolah;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class GaleriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sekolahs = Sekolah::all();

        if ($sekolahs->isEmpty()) {
            $this->command->warn('Tidak ada data sekolah. Jalankan SekolahSeeder terlebih dahulu!');
            return;
        }

        // Pastikan folder galeri ada
        if (!Storage::disk('public')->exists('galeri')) {
            Storage::disk('public')->makeDirectory('galeri');
        }

        $kategoriGaleri = ['gedung', 'kegiatan', 'prestasi', 'lainnya'];

        $judulGaleri = [
            'gedung' => [
                'Gedung Utama Sekolah',
                'Fasilitas Perpustakaan',
                'Laboratorium IPA',
            ],
            'kegiatan' => [
                'Upacara Bendera',
                'Kegiatan Pramuka',
                'Lomba 17 Agustus',
            ],
            'prestasi' => [
                'Juara Olimpiade Matematika',
                'Juara Lomba Pidato',
                'Juara Futsal',
            ],
            'lainnya' => [
                'Kegiatan Ekstrakurikuler',
                'Kunjungan Tamu',
                'Kegiatan Sosial',
            ],
        ];

        $totalGaleri = 0;
        $maxGaleri = 12;
        $urutan = 1;

        // Ambil beberapa sekolah secara acak untuk distribusi galeri
        $sekolahsArray = $sekolahs->shuffle()->toArray();

        foreach ($kategoriGaleri as $kategori) {
            foreach ($judulGaleri[$kategori] as $judul) {
                if ($totalGaleri >= $maxGaleri) {
                    break 2; // Break dari kedua loop
                }

                // Pilih sekolah secara round-robin
                $sekolah = $sekolahsArray[$totalGaleri % count($sekolahsArray)];
                $sekolahModel = Sekolah::find($sekolah['id']);

                if (!$sekolahModel) {
                    continue;
                }

                // Download gambar dari Picsum Photos
                $imageUrl = $this->getImageUrl($kategori, $totalGaleri);
                
                try {
                    $response = Http::timeout(30)->get($imageUrl);
                    
                    if ($response->successful()) {
                        $imageContent = $response->body();
                        $filename = 'galeri_' . time() . '_' . uniqid() . '_' . $totalGaleri . '.jpg';
                        $path = 'galeri/' . $filename;
                        
                        // Simpan gambar ke storage
                        Storage::disk('public')->put($path, $imageContent);
                        
                        Galeri::create([
                            'id_sekolah' => $sekolahModel->id,
                            'judul' => $judul . ' - ' . $sekolahModel->nm_sekolah,
                            'deskripsi' => 'Foto ' . strtolower($judul) . ' di ' . $sekolahModel->nm_sekolah . '. ' . 
                                         'Menampilkan kegiatan dan fasilitas sekolah yang mendukung proses pembelajaran.',
                            'file_foto' => $path,
                            'kategori' => $kategori,
                            'urutan' => $urutan++,
                            'tampilkan' => true,
                        ]);

                        $totalGaleri++;
                        $this->command->info("Downloaded and saved: {$judul} for {$sekolahModel->nm_sekolah}");
                    } else {
                        $this->command->warn("Failed to download image for: {$judul}");
                    }
                } catch (\Exception $e) {
                    $this->command->error("Error downloading image for {$judul}: " . $e->getMessage());
                }
            }
        }

        $this->command->info("Seeder galeri berhasil ditambahkan! Total: {$totalGaleri} gambar.");
    }

    /**
     * Get image URL based on category and index
     */
    private function getImageUrl(string $kategori, int $index): string
    {
        // Menggunakan Picsum Photos untuk mendapatkan gambar placeholder
        // Setiap gambar akan mendapatkan seed yang unik berdasarkan kategori dan index
        $baseSeeds = [
            'gedung' => 101,
            'kegiatan' => 201,
            'prestasi' => 301,
            'lainnya' => 401,
        ];

        $baseSeed = $baseSeeds[$kategori] ?? 100;
        $seed = $baseSeed + $index; // Setiap gambar akan memiliki seed unik
        $width = 800;
        $height = 600;
        
        // Picsum Photos API - gratis dan reliable
        // Format: https://picsum.photos/seed/{seed}/{width}/{height}
        return "https://picsum.photos/seed/{$seed}/{$width}/{$height}";
    }
}


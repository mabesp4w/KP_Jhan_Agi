<?php

namespace Database\Seeders;

use App\Models\Galeri;
use App\Models\Sekolah;
use Illuminate\Database\Seeder;

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

        $kategoriGaleri = ['gedung', 'kegiatan', 'prestasi', 'lainnya'];

        $judulGaleri = [
            'gedung' => [
                'Gedung Utama Sekolah',
                'Fasilitas Perpustakaan',
                'Laboratorium IPA',
                'Ruang Kelas',
                'Lapangan Olahraga',
            ],
            'kegiatan' => [
                'Upacara Bendera',
                'Kegiatan Pramuka',
                'Lomba 17 Agustus',
                'Kegiatan Keagamaan',
                'Field Trip Siswa',
                'Pentas Seni',
            ],
            'prestasi' => [
                'Juara Olimpiade Matematika',
                'Juara Lomba Pidato',
                'Juara Futsal',
                'Prestasi Akademik',
                'Penghargaan Sekolah',
            ],
            'lainnya' => [
                'Kegiatan Ekstrakurikuler',
                'Kunjungan Tamu',
                'Kegiatan Sosial',
            ],
        ];

        foreach ($sekolahs as $sekolah) {
            $urutan = 1;

            // Setiap sekolah memiliki beberapa foto galeri
            foreach ($kategoriGaleri as $kategori) {
                $jumlahFoto = rand(2, 4);
                
                foreach ($judulGaleri[$kategori] as $index => $judul) {
                    if ($index >= $jumlahFoto) break;

                    Galeri::firstOrCreate(
                        [
                            'id_sekolah' => $sekolah->id,
                            'judul' => $judul . ' - ' . $sekolah->nm_sekolah,
                        ],
                        [
                            'id_sekolah' => $sekolah->id,
                            'judul' => $judul . ' - ' . $sekolah->nm_sekolah,
                            'deskripsi' => 'Foto ' . strtolower($judul) . ' di ' . $sekolah->nm_sekolah . '. ' . 
                                         'Menampilkan kegiatan dan fasilitas sekolah yang mendukung proses pembelajaran.',
                            'file_foto' => 'galeri/sekolah-' . $sekolah->id . '/' . strtolower(str_replace([' ', '---'], ['-', '-'], preg_replace('/[^a-z0-9-]/i', '', $judul))) . '.jpg',
                            'kategori' => $kategori,
                            'urutan' => $urutan++,
                            'tampilkan' => true,
                        ]
                    );
                }
            }
        }

        $this->command->info('Seeder galeri berhasil ditambahkan!');
    }
}


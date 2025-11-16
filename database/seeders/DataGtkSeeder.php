<?php

namespace Database\Seeders;

use App\Models\DataGtk;
use App\Models\Sekolah;
use Illuminate\Database\Seeder;

class DataGtkSeeder extends Seeder
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

        // Data untuk beberapa tahun ajaran
        $tahunAjarans = ['2024/2025', '2023/2024', '2022/2023'];

        foreach ($sekolahs as $sekolah) {
            foreach ($tahunAjarans as $thnAjaran) {
                // Generate data GTK yang realistis untuk SMP
                // Total guru sekitar 15-25 orang per sekolah
                $totalGuru = rand(15, 25);
                
                // Distribusi status guru
                $jmlGuruPns = rand(5, min(10, $totalGuru - 5));
                $sisaGuru = $totalGuru - $jmlGuruPns;
                $jmlGuruHonor = rand(3, min(8, $sisaGuru));
                $jmlGuruKontrak = $sisaGuru - $jmlGuruHonor;

                // Distribusi pendidikan guru
                $jmlGuruS1 = rand(10, min(18, $totalGuru - 2));
                $jmlGuruS2 = rand(2, min(5, $totalGuru - $jmlGuruS1));
                $jmlGuruSertifikasi = rand(8, min(15, $totalGuru));

                // Tenaga kependidikan sekitar 3-8 orang
                $totalTendik = rand(3, 8);
                $jmlTendikPns = rand(1, min(3, $totalTendik));
                $sisaTendik = $totalTendik - $jmlTendikPns;
                $jmlTendikHonor = rand(1, min(4, $sisaTendik));
                $jmlTendikKontrak = $sisaTendik - $jmlTendikHonor;

                DataGtk::firstOrCreate(
                    [
                        'id_sekolah' => $sekolah->id,
                        'thn_ajaran' => $thnAjaran,
                    ],
                    [
                        'id_sekolah' => $sekolah->id,
                        'thn_ajaran' => $thnAjaran,
                        'jml_guru_pns' => $jmlGuruPns,
                        'jml_guru_honor' => $jmlGuruHonor,
                        'jml_guru_kontrak' => $jmlGuruKontrak,
                        'jml_guru_s1' => $jmlGuruS1,
                        'jml_guru_s2' => $jmlGuruS2,
                        'jml_guru_sertifikasi' => $jmlGuruSertifikasi,
                        'jml_tendik_pns' => $jmlTendikPns,
                        'jml_tendik_honor' => $jmlTendikHonor,
                        'jml_tendik_kontrak' => $jmlTendikKontrak,
                        'ket' => 'Data GTK tahun ajaran ' . $thnAjaran . ' untuk ' . $sekolah->nm_sekolah,
                    ]
                );
            }
        }

        $this->command->info('Seeder data GTK berhasil ditambahkan!');
    }
}


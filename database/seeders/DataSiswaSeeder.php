<?php

namespace Database\Seeders;

use App\Models\DataSiswa;
use App\Models\Sekolah;
use Illuminate\Database\Seeder;

class DataSiswaSeeder extends Seeder
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
                // Generate data siswa yang realistis
                $jmlKelas7 = rand(3, 6);
                $jmlKelas8 = rand(3, 6);
                $jmlKelas9 = rand(3, 6);

                // Rata-rata 25-35 siswa per kelas
                $jmlSiswaL7 = rand($jmlKelas7 * 12, $jmlKelas7 * 18);
                $jmlSiswaP7 = rand($jmlKelas7 * 12, $jmlKelas7 * 18);
                
                $jmlSiswaL8 = rand($jmlKelas8 * 12, $jmlKelas8 * 18);
                $jmlSiswaP8 = rand($jmlKelas8 * 12, $jmlKelas8 * 18);
                
                $jmlSiswaL9 = rand($jmlKelas9 * 12, $jmlKelas9 * 18);
                $jmlSiswaP9 = rand($jmlKelas9 * 12, $jmlKelas9 * 18);

                DataSiswa::firstOrCreate(
                    [
                        'id_sekolah' => $sekolah->id,
                        'thn_ajaran' => $thnAjaran,
                    ],
                    [
                        'id_sekolah' => $sekolah->id,
                        'thn_ajaran' => $thnAjaran,
                        'jml_kelas_7' => $jmlKelas7,
                        'jml_siswa_l_7' => $jmlSiswaL7,
                        'jml_siswa_p_7' => $jmlSiswaP7,
                        'jml_kelas_8' => $jmlKelas8,
                        'jml_siswa_l_8' => $jmlSiswaL8,
                        'jml_siswa_p_8' => $jmlSiswaP8,
                        'jml_kelas_9' => $jmlKelas9,
                        'jml_siswa_l_9' => $jmlSiswaL9,
                        'jml_siswa_p_9' => $jmlSiswaP9,
                        'ket' => 'Data siswa tahun ajaran ' . $thnAjaran . ' untuk ' . $sekolah->nm_sekolah,
                    ]
                );
            }
        }

        $this->command->info('Seeder data siswa berhasil ditambahkan!');
    }
}


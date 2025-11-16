<?php

namespace Database\Seeders;

use App\Models\Kepsek;
use App\Models\Sekolah;
use Illuminate\Database\Seeder;

class KepsekSeeder extends Seeder
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

        $namaKepsek = [
            'Dr. Yohanes Kambu, M.Pd',
            'Pdt. Markus Wenda, S.Pd',
            'Ibu Maria Yance, M.Pd',
            'Bapak Petrus Kogoya, S.Pd',
            'Ibu Yuliana Tabuni, M.Pd',
            'Pdt. Yosep Wamafma, S.Pd',
            'Bapak Daniel Kogoya, M.Pd',
            'Ibu Ruth Wenda, S.Pd',
            'Pdt. Yakob Kogoya, M.Pd',
            'Ibu Sinta Tabuni, S.Pd',
        ];

        $pendidikan = [
            'S1 Pendidikan',
            'S2 Manajemen Pendidikan',
            'S1 Pendidikan Agama',
            'S2 Administrasi Pendidikan',
            'S1 Pendidikan Matematika',
        ];

        foreach ($sekolahs as $index => $sekolah) {
            // Setiap sekolah memiliki 1 kepala sekolah aktif
            Kepsek::firstOrCreate(
                [
                    'id_sekolah' => $sekolah->id,
                    'aktif' => true,
                ],
                [
                    'id_sekolah' => $sekolah->id,
                    'nm_kepsek' => $namaKepsek[$index % count($namaKepsek)],
                    'nip' => '196' . str_pad($index + 1, 6, '0', STR_PAD_LEFT) . str_pad(rand(100, 999), 3, '0', STR_PAD_LEFT),
                    'no_telp' => '0812' . str_pad(rand(1000000, 9999999), 7, '0', STR_PAD_LEFT),
                    'email' => 'kepsek.' . strtolower(str_replace(' ', '', $sekolah->nm_sekolah)) . '@ypkditanahpapua.org',
                    'jenis_kelamin' => rand(0, 1) ? 'L' : 'P',
                    'pendidikan_terakhir' => $pendidikan[array_rand($pendidikan)],
                    'tgl_mulai' => now()->subYears(rand(1, 5))->format('Y-m-d'),
                    'tgl_selesai' => null,
                    'aktif' => true,
                    'ket' => 'Kepala Sekolah aktif di ' . $sekolah->nm_sekolah,
                ]
            );
        }

        $this->command->info('Seeder kepala sekolah berhasil ditambahkan!');
    }
}


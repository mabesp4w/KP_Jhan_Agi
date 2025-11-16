<?php

namespace Database\Seeders;

use App\Models\Kecamatan;
use App\Models\Kelurahan;
use App\Models\Sekolah;
use Illuminate\Database\Seeder;

class SekolahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data Kecamatan di Kota Jayapura
        $kecamatans = [
            ['nm_kecamatan' => 'Jayapura Utara'],
            ['nm_kecamatan' => 'Jayapura Selatan'],
            ['nm_kecamatan' => 'Abepura'],
            ['nm_kecamatan' => 'Muara Tami'],
            ['nm_kecamatan' => 'Heram'],
        ];

        $kecamatanIds = [];
        foreach ($kecamatans as $kecamatan) {
            $kec = Kecamatan::firstOrCreate(['nm_kecamatan' => $kecamatan['nm_kecamatan']], $kecamatan);
            $kecamatanIds[$kecamatan['nm_kecamatan']] = $kec->id;
        }

        // Data Kelurahan di Kota Jayapura
        $kelurahans = [
            // Jayapura Utara
            ['kecamatan' => 'Jayapura Utara', 'nm_kelurahan' => 'Tanjung Ria', 'kode_pos' => '99111'],
            ['kecamatan' => 'Jayapura Utara', 'nm_kelurahan' => 'Angkasapura', 'kode_pos' => '99112'],
            ['kecamatan' => 'Jayapura Utara', 'nm_kelurahan' => 'Hamadi', 'kode_pos' => '99113'],
            ['kecamatan' => 'Jayapura Utara', 'nm_kelurahan' => 'Entrop', 'kode_pos' => '99114'],
            ['kecamatan' => 'Jayapura Utara', 'nm_kelurahan' => 'Apolima', 'kode_pos' => '99115'],
            
            // Jayapura Selatan
            ['kecamatan' => 'Jayapura Selatan', 'nm_kelurahan' => 'Argapura', 'kode_pos' => '99221'],
            ['kecamatan' => 'Jayapura Selatan', 'nm_kelurahan' => 'Hedam', 'kode_pos' => '99222'],
            ['kecamatan' => 'Jayapura Selatan', 'nm_kelurahan' => 'Numbay', 'kode_pos' => '99223'],
            ['kecamatan' => 'Jayapura Selatan', 'nm_kelurahan' => 'Waena', 'kode_pos' => '99224'],
            ['kecamatan' => 'Jayapura Selatan', 'nm_kelurahan' => 'Yabansai', 'kode_pos' => '99225'],
            
            // Abepura
            ['kecamatan' => 'Abepura', 'nm_kelurahan' => 'Abepura', 'kode_pos' => '99311'],
            ['kecamatan' => 'Abepura', 'nm_kelurahan' => 'Kotaraja', 'kode_pos' => '99312'],
            ['kecamatan' => 'Abepura', 'nm_kelurahan' => 'Kampung Harapan', 'kode_pos' => '99313'],
            ['kecamatan' => 'Abepura', 'nm_kelurahan' => 'Padang Bulan', 'kode_pos' => '99314'],
            ['kecamatan' => 'Abepura', 'nm_kelurahan' => 'Asano', 'kode_pos' => '99315'],
            
            // Muara Tami
            ['kecamatan' => 'Muara Tami', 'nm_kelurahan' => 'Skouw Sae', 'kode_pos' => '99411'],
            ['kecamatan' => 'Muara Tami', 'nm_kelurahan' => 'Skouw Yambe', 'kode_pos' => '99412'],
            ['kecamatan' => 'Muara Tami', 'nm_kelurahan' => 'Skouw Mabo', 'kode_pos' => '99413'],
            
            // Heram
            ['kecamatan' => 'Heram', 'nm_kelurahan' => 'Heram', 'kode_pos' => '99511'],
            ['kecamatan' => 'Heram', 'nm_kelurahan' => 'Yoka', 'kode_pos' => '99512'],
            ['kecamatan' => 'Heram', 'nm_kelurahan' => 'Koya', 'kode_pos' => '99513'],
        ];

        $kelurahanIds = [];
        foreach ($kelurahans as $kelurahan) {
            $kel = Kelurahan::firstOrCreate(
                [
                    'id_kecamatan' => $kecamatanIds[$kelurahan['kecamatan']],
                    'nm_kelurahan' => $kelurahan['nm_kelurahan'],
                ],
                [
                    'id_kecamatan' => $kecamatanIds[$kelurahan['kecamatan']],
                    'nm_kelurahan' => $kelurahan['nm_kelurahan'],
                    'kode_pos' => $kelurahan['kode_pos'],
                ]
            );
            $kelurahanIds[$kelurahan['nm_kelurahan']] = $kel->id;
        }

        // Data Sekolah SMP YPK di Kota Jayapura
        $sekolahs = [
            [
                'npsn' => '60100101',
                'nm_sekolah' => 'SMP YPK Eben Haezer',
                'id_kelurahan' => $kelurahanIds['Argapura'],
                'alamat' => 'Jl. Argapura No. 22, Argapura, Jayapura Selatan, Kota Jayapura',
                'no_telp' => '0967-531234',
                'email' => 'smpypk.ebenhaezer@ypkditanahpapua.org',
                'website' => null,
                'latitude' => -2.5333,
                'longitude' => 140.7167,
                'thn_berdiri' => 1985,
                'status_sekolah' => 'aktif',
                'akreditasi' => 'A',
                'tgl_akreditasi' => '2020-01-15',
                'ket' => 'Sekolah SMP YPK yang berlokasi di pusat kota Jayapura',
            ],
            [
                'npsn' => '60100102',
                'nm_sekolah' => 'SMP YPK Immanuel',
                'id_kelurahan' => $kelurahanIds['Abepura'],
                'alamat' => 'Jl. Raya Abepura, Abepura, Kota Jayapura',
                'no_telp' => '0967-531567',
                'email' => 'smpypk.immanuel@ypkditanahpapua.org',
                'website' => null,
                'latitude' => -2.6000,
                'longitude' => 140.6500,
                'thn_berdiri' => 1990,
                'status_sekolah' => 'aktif',
                'akreditasi' => 'A',
                'tgl_akreditasi' => '2021-03-20',
                'ket' => 'Sekolah SMP YPK di Kecamatan Abepura',
            ],
            [
                'npsn' => '60100103',
                'nm_sekolah' => 'SMP YPK Bethel',
                'id_kelurahan' => $kelurahanIds['Waena'],
                'alamat' => 'Jl. Waena Raya, Waena, Jayapura Selatan, Kota Jayapura',
                'no_telp' => '0967-531890',
                'email' => 'smpypk.bethel@ypkditanahpapua.org',
                'website' => null,
                'latitude' => -2.5500,
                'longitude' => 140.7000,
                'thn_berdiri' => 1995,
                'status_sekolah' => 'aktif',
                'akreditasi' => 'B',
                'tgl_akreditasi' => '2019-11-10',
                'ket' => 'Sekolah SMP YPK di Kelurahan Waena',
            ],
            [
                'npsn' => '60100104',
                'nm_sekolah' => 'SMP YPK GKI',
                'id_kelurahan' => $kelurahanIds['Tanjung Ria'],
                'alamat' => 'Jl. Tanjung Ria, Tanjung Ria, Jayapura Utara, Kota Jayapura',
                'no_telp' => '0967-532123',
                'email' => 'smpypk.gki@ypkditanahpapua.org',
                'website' => null,
                'latitude' => -2.5000,
                'longitude' => 140.7500,
                'thn_berdiri' => 1988,
                'status_sekolah' => 'aktif',
                'akreditasi' => 'A',
                'tgl_akreditasi' => '2022-05-18',
                'ket' => 'Sekolah SMP YPK di Kecamatan Jayapura Utara',
            ],
            [
                'npsn' => '60100105',
                'nm_sekolah' => 'SMP YPK Kanaan',
                'id_kelurahan' => $kelurahanIds['Kotaraja'],
                'alamat' => 'Jl. Kotaraja, Kotaraja, Abepura, Kota Jayapura',
                'no_telp' => '0967-532456',
                'email' => 'smpypk.kanaan@ypkditanahpapua.org',
                'website' => null,
                'latitude' => -2.5800,
                'longitude' => 140.6800,
                'thn_berdiri' => 1992,
                'status_sekolah' => 'aktif',
                'akreditasi' => 'B',
                'tgl_akreditasi' => '2020-08-25',
                'ket' => 'Sekolah SMP YPK di Kelurahan Kotaraja',
            ],
            [
                'npsn' => '60100106',
                'nm_sekolah' => 'SMP YPK Sion',
                'id_kelurahan' => $kelurahanIds['Hamadi'],
                'alamat' => 'Jl. Hamadi, Hamadi, Jayapura Utara, Kota Jayapura',
                'no_telp' => '0967-532789',
                'email' => 'smpypk.sion@ypkditanahpapua.org',
                'website' => null,
                'latitude' => -2.5200,
                'longitude' => 140.7200,
                'thn_berdiri' => 1993,
                'status_sekolah' => 'aktif',
                'akreditasi' => 'B',
                'tgl_akreditasi' => '2021-07-12',
                'ket' => 'Sekolah SMP YPK di Kelurahan Hamadi',
            ],
            [
                'npsn' => '60100107',
                'nm_sekolah' => 'SMP YPK Elim',
                'id_kelurahan' => $kelurahanIds['Padang Bulan'],
                'alamat' => 'Jl. Padang Bulan, Padang Bulan, Abepura, Kota Jayapura',
                'no_telp' => '0967-533012',
                'email' => 'smpypk.elim@ypkditanahpapua.org',
                'website' => null,
                'latitude' => -2.6100,
                'longitude' => 140.6400,
                'thn_berdiri' => 1996,
                'status_sekolah' => 'aktif',
                'akreditasi' => 'C',
                'tgl_akreditasi' => '2018-09-30',
                'ket' => 'Sekolah SMP YPK di Kelurahan Padang Bulan',
            ],
            [
                'npsn' => '60100108',
                'nm_sekolah' => 'SMP YPK Siloam',
                'id_kelurahan' => $kelurahanIds['Yabansai'],
                'alamat' => 'Jl. Yabansai, Yabansai, Jayapura Selatan, Kota Jayapura',
                'no_telp' => '0967-533345',
                'email' => 'smpypk.siloam@ypkditanahpapua.org',
                'website' => null,
                'latitude' => -2.5600,
                'longitude' => 140.6900,
                'thn_berdiri' => 1994,
                'status_sekolah' => 'aktif',
                'akreditasi' => 'B',
                'tgl_akreditasi' => '2020-12-05',
                'ket' => 'Sekolah SMP YPK di Kelurahan Yabansai',
            ],
            [
                'npsn' => '60100109',
                'nm_sekolah' => 'SMP YPK Getsemani',
                'id_kelurahan' => $kelurahanIds['Entrop'],
                'alamat' => 'Jl. Entrop, Entrop, Jayapura Utara, Kota Jayapura',
                'no_telp' => '0967-533678',
                'email' => 'smpypk.getsemani@ypkditanahpapua.org',
                'website' => null,
                'latitude' => -2.5100,
                'longitude' => 140.7300,
                'thn_berdiri' => 1991,
                'status_sekolah' => 'aktif',
                'akreditasi' => 'A',
                'tgl_akreditasi' => '2023-02-14',
                'ket' => 'Sekolah SMP YPK di Kelurahan Entrop',
            ],
            [
                'npsn' => '60100110',
                'nm_sekolah' => 'SMP YPK Nazaret',
                'id_kelurahan' => $kelurahanIds['Asano'],
                'alamat' => 'Jl. Asano, Asano, Abepura, Kota Jayapura',
                'no_telp' => '0967-534001',
                'email' => 'smpypk.nazaret@ypkditanahpapua.org',
                'website' => null,
                'latitude' => -2.5900,
                'longitude' => 140.6700,
                'thn_berdiri' => 1997,
                'status_sekolah' => 'aktif',
                'akreditasi' => 'C',
                'tgl_akreditasi' => '2019-06-20',
                'ket' => 'Sekolah SMP YPK di Kelurahan Asano',
            ],
        ];

        foreach ($sekolahs as $sekolah) {
            Sekolah::firstOrCreate(
                ['npsn' => $sekolah['npsn']],
                $sekolah
            );
        }

        $this->command->info('Seeder sekolah SMP YPK berhasil ditambahkan!');
    }
}


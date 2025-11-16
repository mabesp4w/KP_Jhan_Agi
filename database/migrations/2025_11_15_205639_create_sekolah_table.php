<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sekolah', function (Blueprint $table) {
            $table->id();
            $table->string('npsn')->unique()->comment('Nomor Pokok Sekolah Nasional');
            $table->string('nm_sekolah');
            $table->foreignId('id_kelurahan')->constrained('kelurahan')->onDelete('restrict');
            $table->text('alamat');
            $table->string('no_telp')->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();

            // Koordinat Geografis
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);

            // Informasi Sekolah
            $table->year('thn_berdiri')->nullable();
            $table->enum('status_sekolah', ['aktif', 'tidak_aktif'])->default('aktif');
            $table->enum('akreditasi', ['A', 'B', 'C', 'Belum'])->default('Belum');
            $table->date('tgl_akreditasi')->nullable();

            $table->text('ket')->nullable();
            $table->string('foto_utama')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sekolah');
    }
};

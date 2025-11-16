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
        Schema::create('data_siswa', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_sekolah')->constrained('sekolah')->onDelete('cascade');
            $table->string('thn_ajaran', 9)->comment('Format: 2024/2025');

            // Kelas 7
            $table->integer('jml_kelas_7')->default(0);
            $table->integer('jml_siswa_l_7')->default(0);
            $table->integer('jml_siswa_p_7')->default(0);

            // Kelas 8
            $table->integer('jml_kelas_8')->default(0);
            $table->integer('jml_siswa_l_8')->default(0);
            $table->integer('jml_siswa_p_8')->default(0);

            // Kelas 9
            $table->integer('jml_kelas_9')->default(0);
            $table->integer('jml_siswa_l_9')->default(0);
            $table->integer('jml_siswa_p_9')->default(0);


            $table->text('ket')->nullable();
            $table->timestamps();
            $table->unique(['id_sekolah', 'thn_ajaran']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_siswa');
    }
};

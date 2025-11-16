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
        Schema::create('data_gtk', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_sekolah')->constrained('sekolah')->onDelete('cascade');
            $table->string('thn_ajaran', 9)->comment('Format: 2024/2025');

            // Guru
            $table->integer('jml_guru_pns')->default(0);
            $table->integer('jml_guru_honor')->default(0);
            $table->integer('jml_guru_kontrak')->default(0);
            $table->integer('jml_guru_s1')->default(0);
            $table->integer('jml_guru_s2')->default(0);
            $table->integer('jml_guru_sertifikasi')->default(0);

            // Tenaga Kependidikan
            $table->integer('jml_tendik_pns')->default(0);
            $table->integer('jml_tendik_honor')->default(0);
            $table->integer('jml_tendik_kontrak')->default(0);


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
        Schema::dropIfExists('data_gtk');
    }
};

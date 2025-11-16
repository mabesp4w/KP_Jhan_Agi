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
        Schema::create('kepsek', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_sekolah')->constrained('sekolah')->onDelete('cascade');
            $table->string('nm_kepsek');
            $table->string('nip')->nullable();
            $table->string('no_telp')->nullable();
            $table->string('email')->nullable();
            $table->enum('jenis_kelamin', ['L', 'P'])->nullable();
            $table->string('pendidikan_terakhir')->nullable();
            $table->date('tgl_mulai');
            $table->date('tgl_selesai')->nullable();
            $table->boolean('aktif')->default(true);
            $table->string('foto')->nullable();
            $table->text('ket')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kepsek');
    }
};

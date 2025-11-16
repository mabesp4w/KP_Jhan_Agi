<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Welcome page moved to /welcome
Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Admin Routes - Hanya bisa diakses oleh admin
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

    // Kecamatan Routes
    Route::resource('kecamatan', \App\Http\Controllers\Admin\KecamatanController::class);

    // Kelurahan Routes
    Route::resource('kelurahan', \App\Http\Controllers\Admin\KelurahanController::class);

    // Sekolah Routes
    Route::resource('sekolah', \App\Http\Controllers\Admin\SekolahController::class);

    // Kepsek Routes
    Route::resource('kepsek', \App\Http\Controllers\Admin\KepsekController::class);

    // Data Siswa Routes
    Route::resource('data-siswa', \App\Http\Controllers\Admin\DataSiswaController::class);

    // Data GTK Routes
    Route::resource('data-gtk', \App\Http\Controllers\Admin\DataGtkController::class);

    // Galeri Routes
    Route::resource('galeri', \App\Http\Controllers\Admin\GaleriController::class);
});

// Petugas Routes - Hanya bisa diakses oleh petugas
Route::middleware(['auth', 'verified', 'role:petugas'])->prefix('petugas')->name('petugas.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Petugas/Dashboard');
    })->name('dashboard');
});

// User Routes - Public routes untuk user
Route::get('/', [\App\Http\Controllers\User\UserController::class, 'dashboard'])->name('home');
Route::get('/sekolah', [\App\Http\Controllers\User\UserController::class, 'sekolahIndex'])->name('user.sekolah.index');
Route::get('/sekolah/{sekolah}', [\App\Http\Controllers\User\UserController::class, 'sekolahShow'])->name('user.sekolah.show');
Route::get('/galeri', [\App\Http\Controllers\User\UserController::class, 'galeriIndex'])->name('user.galeri.index');
Route::get('/tentang', [\App\Http\Controllers\User\UserController::class, 'tentang'])->name('user.tentang');

// Alias untuk user dashboard
Route::prefix('user')->name('user.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\User\UserController::class, 'dashboard'])->name('dashboard');
});

require __DIR__.'/auth.php';

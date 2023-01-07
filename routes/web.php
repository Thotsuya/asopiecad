<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/','/login');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');



    // I'll later wrap this routes into a single route resource
    Route::get('/forms', [\App\Http\Controllers\Admin\FormController::class, 'index'])->name('forms.index');
    Route::post('/forms', [\App\Http\Controllers\Admin\FormController::class, 'store'])->name('forms.store');
    Route::get('/forms/create', [\App\Http\Controllers\Admin\FormController::class, 'create'])->name('forms.create');
    Route::get('/forms/{form}/edit', [\App\Http\Controllers\Admin\FormController::class, 'edit'])->name('forms.edit');
    Route::get('/forms/{form}', [\App\Http\Controllers\Admin\FormController::class, 'show'])->name('forms.show');
});

require __DIR__.'/auth.php';

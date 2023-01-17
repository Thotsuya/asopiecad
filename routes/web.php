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

    Route::resource('forms', App\Http\Controllers\Admin\FormController::class);
    Route::resource('projects', App\Http\Controllers\Admin\ProjectController::class)->except('create');
    Route::resource('users', App\Http\Controllers\Admin\UsersController::class);
    Route::resource('roles', App\Http\Controllers\Admin\RoleController::class);
    Route::resource('appointments', App\Http\Controllers\Admin\AppointmentController::class);
    Route::resource('beneficiaries', App\Http\Controllers\Admin\BeneficiariesController::class);

    Route::get('projects/{project}/forms', [App\Http\Controllers\Admin\ProjectFormController::class, 'create'])->name('projects.forms.create');
    Route::post('projects/{project}/forms', [App\Http\Controllers\Admin\ProjectFormController::class, 'store'])->name('projects.forms.store');
    Route::get('projects/{project}/beneficiaries/{beneficiary}/edit', [App\Http\Controllers\Admin\ProjectFormController::class, 'edit'])->name('projects.forms.edit');
    Route::put('projects/{project}/beneficiaries/{beneficiary}', [App\Http\Controllers\Admin\ProjectFormController::class, 'update'])->name('projects.forms.update');
    Route::delete('projects/{project}/beneficiaries/{beneficiary}', [App\Http\Controllers\Admin\ProjectFormController::class, 'destroy'])->name('projects.forms.destroy');

    Route::post('/projects/{project}/goals', [App\Http\Controllers\Admin\GoalController::class, 'store'])->name('projects.goals.store');
    Route::post('/projects/{goal}/progress', [App\Http\Controllers\Admin\GoalProgressController::class, 'store'])->name('projects.goals.progress.store');

    Route::get('/projects/{project}/reports', [App\Http\Controllers\Admin\ProjectReportsController::class, 'index'])->name('projects.reports.index');


});

require __DIR__.'/auth.php';

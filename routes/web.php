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
    Route::patch('beneficiaries/{beneficiary}/approve', [App\Http\Controllers\Admin\BeneficiariesController::class, 'approve'])->name('beneficiaries.approve');

    Route::get('projects/{project}/forms', [App\Http\Controllers\Admin\ProjectFormController::class, 'create'])->name('projects.forms.create');
    Route::post('projects/{project}/forms', [App\Http\Controllers\Admin\ProjectFormController::class, 'store'])->name('projects.forms.store');
    Route::get('projects/{project}/beneficiaries/{beneficiary}/edit', [App\Http\Controllers\Admin\ProjectFormController::class, 'edit'])->name('projects.forms.edit');
    Route::put('projects/{project}/beneficiaries/{beneficiary}', [App\Http\Controllers\Admin\ProjectFormController::class, 'update'])->name('projects.forms.update');
    Route::delete('projects/{project}/beneficiaries/{beneficiary}', [App\Http\Controllers\Admin\ProjectFormController::class, 'destroy'])->name('projects.forms.destroy');
    Route::patch('projects/{project}/beneficiaries/{beneficiary}/approve', [App\Http\Controllers\Admin\ProjectFormController::class, 'approve'])->name('projects.forms.approve');

    Route::post('/projects/{project}/programs', [App\Http\Controllers\Admin\ProgramController::class, 'store'])->name('projects.programs.store');
    Route::put('/programs/{program}', [App\Http\Controllers\Admin\ProgramController::class, 'update'])->name('projects.programs.update');
    Route::delete('/programs/{program}', [App\Http\Controllers\Admin\ProgramController::class, 'destroy'])->name('projects.programs.destroy');
    Route::patch('/projects/{project}/programs/order', [App\Http\Controllers\Admin\ProgramController::class, 'order'])->name('projects.programs.order');

    Route::post('/projects/{project}/goals', [App\Http\Controllers\Admin\GoalController::class, 'store'])->name('projects.goals.store');
    Route::post('/projects/{goal}/progress', [App\Http\Controllers\Admin\GoalProgressController::class, 'store'])->name('projects.goals.progress.store');

    Route::get('/projects/{project}/reports', [App\Http\Controllers\Admin\ProjectReportsController::class, 'index'])->name('projects.reports.index');

    Route::post('/forms/{form}/tabs', [App\Http\Controllers\Admin\TabController::class, 'store'])->name('forms.tabs.store');
    Route::put('/tabs/{tab}', [App\Http\Controllers\Admin\TabController::class, 'update'])->name('forms.tabs.update');
    Route::delete('/tabs/{tab}', [App\Http\Controllers\Admin\TabController::class, 'destroy'])->name('forms.tabs.destroy');
    Route::patch('/forms/{form}/tabs/order', [App\Http\Controllers\Admin\TabController::class, 'order'])->name('forms.tabs.order');

    Route::post('/tabs/{tab}/fields', [App\Http\Controllers\Admin\FieldController::class, 'store'])->name('tabs.fields.store');


});

require __DIR__.'/auth.php';

<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware(['auth'])->group(function () {

    // ✅ Profile (normal user access)
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');


    // =========================
    // 🔐 PERMISSIONS MODULE
    // =========================
    Route::get('/permissions', [PermissionController::class, 'index'])
        ->middleware('permission:view permissions')
        ->name('permissions.index');

    Route::get('/permissions/create', [PermissionController::class, 'create'])
        ->middleware('permission:create permissions')
        ->name('permissions.create');

    Route::post('/permissions', [PermissionController::class, 'store'])
        ->middleware('permission:create permissions')
        ->name('permissions.store');

    Route::get('/permissions/{permission}/edit', [PermissionController::class, 'edit'])
        ->middleware('permission:edit permissions')
        ->name('permissions.edit');

    Route::put('/permissions/{permission}', [PermissionController::class, 'update'])
        ->middleware('permission:edit permissions')
        ->name('permissions.update');

    Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])
        ->middleware('permission:delete permissions')
        ->name('permissions.destroy');


    // =========================
    // 🔐 ROLES MODULE
    // =========================
    Route::get('/roles', [RoleController::class, 'index'])
        ->middleware('permission:view roles')
        ->name('roles.index');

    Route::get('/roles/create', [RoleController::class, 'create'])
        ->middleware('permission:create roles')
        ->name('roles.create');

    Route::post('/roles', [RoleController::class, 'store'])
        ->middleware('permission:create roles')
        ->name('roles.store');

    Route::get('/roles/{role}/edit', [RoleController::class, 'edit'])
        ->middleware('permission:edit roles')
        ->name('roles.edit');

    Route::put('/roles/{role}', [RoleController::class, 'update'])
        ->middleware('permission:edit roles')
        ->name('roles.update');

    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])
        ->middleware('permission:delete roles')
        ->name('roles.destroy');


    // =========================
    // 🔐 USERS MODULE
    // =========================
    Route::get('/users', [UserController::class, 'index'])
        ->middleware('permission:view users')
        ->name('users.index');

    Route::get('/users/create', [UserController::class, 'create'])
        ->middleware('permission:create users')
        ->name('users.create');

    Route::post('/users', [UserController::class, 'store'])
        ->middleware('permission:create users')
        ->name('users.store');

    Route::get('/users/{user}/edit', [UserController::class, 'edit'])
        ->middleware('permission:edit users')
        ->name('users.edit');

    Route::put('/users/{user}', [UserController::class, 'update'])
        ->middleware('permission:edit users')
        ->name('users.update');

    Route::delete('/users/{user}', [UserController::class, 'destroy'])
        ->middleware('permission:delete users')
        ->name('users.destroy');

});

require __DIR__.'/auth.php';
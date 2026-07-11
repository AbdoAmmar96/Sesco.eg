<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\ConsultantController;
use App\Http\Controllers\Admin\ContentBlockController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DownloadController;
use App\Http\Controllers\Admin\FeaturedProductController;
use App\Http\Controllers\Admin\LeadAdminController;
use App\Http\Controllers\Admin\ProductCategoryController;
use App\Http\Controllers\Admin\ProductGroupController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SettingController;
use Illuminate\Support\Facades\Route;

// Serve the React SPA (its built index.html lives in public/) at the site root.
Route::get('/', fn () => response()->file(public_path('index.html')));

Route::prefix('admin')->name('admin.')->group(function () {
    // Auth
    Route::get('login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('login', [AuthController::class, 'login'])->name('login.attempt');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    Route::middleware('auth')->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        // Leads
        Route::get('leads', [LeadAdminController::class, 'index'])->name('leads.index');
        Route::get('leads/{lead}', [LeadAdminController::class, 'show'])->name('leads.show');
        Route::patch('leads/{lead}/status', [LeadAdminController::class, 'updateStatus'])->name('leads.status');
        Route::delete('leads/{lead}', [LeadAdminController::class, 'destroy'])->name('leads.destroy');

        // Content resources
        Route::resource('projects', ProjectController::class)->except('show');
        Route::resource('brands', BrandController::class)->except('show');
        Route::resource('consultants', ConsultantController::class)->except('show');
        Route::resource('services', ServiceController::class)->except('show');
        Route::resource('downloads', DownloadController::class)->except('show');
        Route::resource('content-blocks', ContentBlockController::class)->except('show');
        Route::resource('product-categories', ProductCategoryController::class)->except('show');
        Route::resource('product-groups', ProductGroupController::class)->except('show');
        Route::resource('featured-products', FeaturedProductController::class)->except('show');

        // Settings (singleton)
        Route::get('settings', [SettingController::class, 'edit'])->name('settings.edit');
        Route::put('settings', [SettingController::class, 'update'])->name('settings.update');
    });
});

// SPA fallback: any route not matched above (and not an /api or asset request)
// returns the React app so React Router can handle client-side routing.
Route::fallback(fn () => response()->file(public_path('index.html')));

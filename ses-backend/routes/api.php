<?php

use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\LeadController;
use Illuminate\Support\Facades\Route;

// Public lead capture (Contact form + Request a Quotation)
Route::post('/leads', [LeadController::class, 'store']);

// Full site content tree (consumed by the React frontend)
Route::get('/content', [ContentController::class, 'index']);

// Lightweight health/info endpoint
Route::get('/ping', fn () => response()->json(['ok' => true, 'service' => 'ses-backend']));

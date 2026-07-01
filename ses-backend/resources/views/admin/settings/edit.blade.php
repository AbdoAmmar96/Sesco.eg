@extends('admin.layout')
@section('title', 'Site Settings')

@php
    $cls = 'w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-orange';
    $companyFields = [
        'name' => 'Company Name', 'shortName' => 'Short Name', 'tagline' => 'Tagline',
        'address' => 'Address', 'phone' => 'Phone', 'email' => 'Email',
        'website' => 'Website', 'hours' => 'Working Hours', 'hoursNote' => 'Hours Note',
    ];
    $pageLabels = ['home' => 'Home', 'about' => 'About', 'products' => 'Products', 'projects' => 'Projects', 'services' => 'Services', 'downloads' => 'Downloads', 'contact' => 'Contact'];
@endphp

@section('content')
    <p class="text-sm text-slate-500">Company information, page hero texts and project filters. Changes appear on the website instantly.</p>

    <form method="POST" action="{{ route('admin.settings.update') }}" class="mt-5 space-y-6">
        @csrf @method('PUT')

        {{-- Company --}}
        <div class="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 class="mb-4 text-base font-bold text-navy-900">Company Information</h2>
            <div class="grid gap-4 sm:grid-cols-2">
                @foreach ($companyFields as $key => $label)
                    <div>
                        <label class="mb-1 block text-sm font-semibold text-navy-800">{{ $label }}</label>
                        <input type="text" name="company[{{ $key }}]" value="{{ old('company.'.$key, $company[$key] ?? '') }}" class="{{ $cls }}">
                    </div>
                @endforeach
            </div>
            <div class="mt-4">
                <label class="mb-1 block text-sm font-semibold text-navy-800">Intro (footer / about)</label>
                <textarea name="company[intro]" rows="2" class="{{ $cls }}">{{ old('company.intro', $company['intro'] ?? '') }}</textarea>
            </div>
            <div class="mt-4">
                <label class="mb-1 block text-sm font-semibold text-navy-800">Map Embed URL</label>
                <input type="text" name="company[mapEmbed]" value="{{ old('company.mapEmbed', $company['mapEmbed'] ?? '') }}" class="{{ $cls }}">
            </div>
            <div class="mt-4 grid gap-4 sm:grid-cols-3">
                @foreach (['facebook' => 'Facebook', 'linkedin' => 'LinkedIn', 'youtube' => 'YouTube'] as $key => $label)
                    <div>
                        <label class="mb-1 block text-sm font-semibold text-navy-800">{{ $label }} URL</label>
                        <input type="text" name="company[social][{{ $key }}]" value="{{ old('company.social.'.$key, $company['social'][$key] ?? '') }}" class="{{ $cls }}">
                    </div>
                @endforeach
            </div>
        </div>

        {{-- Page hero texts --}}
        <div class="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 class="mb-4 text-base font-bold text-navy-900">Page Hero Texts</h2>
            <div class="space-y-5">
                @foreach ($pageLabels as $key => $label)
                    <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                        <h3 class="mb-2 text-sm font-bold text-navy-700">{{ $label }} Page</h3>
                        <div class="grid gap-3">
                            <input type="text" name="pages[{{ $key }}][title]" value="{{ old('pages.'.$key.'.title', $pages[$key]['title'] ?? '') }}" placeholder="Title" class="{{ $cls }}">
                            <textarea name="pages[{{ $key }}][subtitle]" rows="2" placeholder="Subtitle" class="{{ $cls }}">{{ old('pages.'.$key.'.subtitle', $pages[$key]['subtitle'] ?? '') }}</textarea>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        {{-- Project filters --}}
        <div class="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 class="mb-2 text-base font-bold text-navy-900">Project Filters</h2>
            <p class="mb-2 text-xs text-slate-400">One per line. The first ("All Projects") shows everything.</p>
            <textarea name="project_filters" rows="6" class="{{ $cls }}">{{ old('project_filters', implode("\n", $projectFilters ?? [])) }}</textarea>
        </div>

        <div class="flex gap-3">
            <button class="rounded-lg bg-brand-orange px-6 py-2.5 text-sm font-bold text-white hover:bg-orange-600">Save Settings</button>
        </div>
    </form>
@endsection

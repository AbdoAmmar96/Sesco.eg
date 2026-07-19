@extends('admin.layout')
@section('title', $creating ? 'Add Product' : 'Edit Product — '.($item['name'] ?? ''))

@section('content')
    <a href="{{ route('admin.products.index') }}" class="text-sm font-semibold text-slate-500 hover:text-navy-900">← Back to products</a>

    <form method="POST" action="{{ $creating ? route('admin.products.store') : route('admin.products.update', [$group, $index]) }}"
          enctype="multipart/form-data" class="mt-4 max-w-3xl space-y-6">
        @csrf
        @unless ($creating) @method('PUT') @endunless

        {{-- Basics --}}
        <div class="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 class="text-sm font-bold uppercase tracking-wide text-slate-400">Basics</h2>
            @if ($creating)
                <x-select name="product_group_id" label="Add To" :options="$groupOptions" :selected="old('product_group_id')" required placeholder="Select category → group" />
            @else
                <p class="-mt-2 text-xs text-slate-400">In <span class="font-semibold text-slate-500">{{ optional($group->category)->name }}</span> → {{ $group->title }}</p>
            @endif
            <x-input name="name" label="Product Name" :value="old('name', $item['name'] ?? '')" required />
            <x-input name="spec" label="Spec / Subtitle" :value="old('spec', $item['spec'] ?? '')" hint="Optional short subtitle, e.g. DI Flanged" />
            <x-input name="icon" label="Icon" :value="old('icon', $item['icon'] ?? 'box')" hint="Lucide icon key, e.g. valve, pump, coupling, detector" />
        </div>

        {{-- Image --}}
        <div class="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 class="text-sm font-bold uppercase tracking-wide text-slate-400">Image</h2>
            <x-upload name="image" label="Product Image" :current="$item['image'] ?? null"
                      hint="The product photo shown on cards and the detail page. Leave empty to keep the current image." />
        </div>

        {{-- Description --}}
        <div class="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 class="text-sm font-bold uppercase tracking-wide text-slate-400">Description</h2>
            <x-textarea name="overview" label="Overview" :value="old('overview', $item['overview'] ?? '')" rows="5"
                        hint="The main product description paragraph." />
            <x-textarea name="highlights" label="Highlights" :value="old('highlights', array_to_lines($item['highlights'] ?? []))" rows="4"
                        hint="Short highlighted badges — one per line (e.g. 300 PSI Working Pressure)." />
        </div>

        {{-- Technical Features --}}
        <div class="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 class="text-sm font-bold uppercase tracking-wide text-slate-400">Technical Features</h2>
            <x-textarea name="tech_features" label="Features Table" :value="old('tech_features', pairs_to_lines($item['techFeatures'] ?? []))" rows="8"
                        hint="One row per line as  Label | Value  (e.g.  Body Material | Ductile Iron ASTM A536 )." />
        </div>

        {{-- Dimensions --}}
        <div class="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 class="text-sm font-bold uppercase tracking-wide text-slate-400">Dimensions</h2>
            <x-textarea name="dimensions" label="Dimensions Table" :value="old('dimensions', table_to_lines($item['dimensions'] ?? []))" rows="8"
                        hint="First line = column headers, each next line = a row. Separate cells with | . Example first line:  Size | DN | L | D | H" />
        </div>

        {{-- Materials --}}
        <div class="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 class="text-sm font-bold uppercase tracking-wide text-slate-400">Materials &amp; Standard List</h2>
            <x-textarea name="materials" label="Materials Table" :value="old('materials', materials_to_lines($item['materials'] ?? []))" rows="9"
                        hint="One row per line as  No | Name | Material | Standard  (e.g.  1 | Body | Ductile Iron | ASTM A536 )." />
        </div>

        {{-- Technical Drawings --}}
        @include('admin.partials._diagrams', ['diagrams' => $diagrams])

        <div class="flex gap-3">
            <button class="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600">{{ $creating ? 'Add Product' : 'Save Product' }}</button>
            <a href="{{ route('admin.products.index') }}" class="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</a>
        </div>
    </form>
@endsection

@extends('admin.layout')
@section('title', $item->exists ? 'Edit Featured Product' : 'Add Featured Product')

@section('content')
    <a href="{{ route('admin.featured-products.index') }}" class="text-sm font-semibold text-slate-500 hover:text-navy-900">← Back to featured products</a>

    <form method="POST" action="{{ $item->exists ? route('admin.featured-products.update', $item) : route('admin.featured-products.store') }}"
          enctype="multipart/form-data" class="mt-4 max-w-3xl space-y-6">
        @csrf
        @if ($item->exists) @method('PUT') @endif

        {{-- Basics --}}
        <div class="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 class="text-sm font-bold uppercase tracking-wide text-slate-400">Basics</h2>
            <x-select name="product_category_id" label="Shown In" :options="$categories" :selected="$item->product_category_id" />
            <x-input name="name" label="Product Name" :value="$item->name" required />
            <x-input name="spec" label="Spec / Subtitle" :value="$item->spec" hint="Optional, e.g. DI Flanged" />
            <x-input name="icon" label="Icon" :value="$item->icon" hint="Lucide icon key, e.g. pump, valve, detector" />
            <x-input name="sort_order" label="Sort Order" type="number" :value="$item->sort_order ?? 0" />
            <x-check :checked="$item->is_active ?? true" />
        </div>

        {{-- Images --}}
        <div class="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 class="text-sm font-bold uppercase tracking-wide text-slate-400">Images</h2>
            <x-upload name="image" label="Main Image" :current="$item->image"
                      hint="The primary product photo (also used on cards). Leave empty to keep the current one." />

            <div>
                <label class="mb-1 block text-sm font-semibold text-navy-800">Gallery Images</label>
                <p class="mb-2 text-xs text-slate-400">Extra photos shown as thumbnails on the product page. You can select multiple files.</p>
                @if (!empty($item->gallery))
                    <div class="mb-3 flex flex-wrap gap-3">
                        @foreach ($item->gallery as $g)
                            <label class="relative block cursor-pointer">
                                <input type="checkbox" name="gallery_current[]" value="{{ $g }}" checked class="peer sr-only">
                                <img src="{{ media_preview($g) }}" alt="" class="h-20 w-20 rounded-lg border-2 border-slate-200 object-cover peer-checked:border-brand-orange">
                                <span class="absolute right-1 top-1 rounded bg-black/60 px-1 text-[10px] font-semibold text-white peer-checked:hidden">removed</span>
                                <span class="absolute right-1 top-1 hidden rounded bg-brand-orange px-1 text-[10px] font-semibold text-white peer-checked:inline">kept</span>
                            </label>
                        @endforeach
                    </div>
                    <p class="mb-2 text-xs text-slate-400">Untick a photo to remove it on save.</p>
                @endif
                <input type="file" name="gallery[]" accept="image/*" multiple
                    class="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-navy-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-navy-800">
                @error('gallery.*')<p class="mt-1 text-xs text-red-600">{{ $message }}</p>@enderror
            </div>

            <x-upload name="diagram_image" label="Cross-Section / Diagram Image" :current="$item->diagram_image"
                      hint="Optional technical diagram shown in its own section." />
            <x-input name="diagram_caption" label="Diagram Caption" :value="$item->diagram_caption"
                     hint="Caption shown under the diagram image." />
        </div>

        {{-- Technical Drawings (structure / dimensions, labelled) --}}
        @include('admin.partials._diagrams', ['diagrams' => $item->diagrams])

        {{-- Description --}}
        <div class="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 class="text-sm font-bold uppercase tracking-wide text-slate-400">Description</h2>
            <x-textarea name="overview" label="Overview" :value="$item->overview" rows="5"
                        hint="The main product description paragraph." />
            <x-textarea name="highlights" label="Highlights" :value="array_to_lines($item->highlights)" rows="4"
                        hint="Short highlighted badges — one per line (e.g. 300 PSI Working Pressure)." />
        </div>

        {{-- Technical Features --}}
        <div class="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 class="text-sm font-bold uppercase tracking-wide text-slate-400">Technical Features</h2>
            <x-textarea name="tech_features" label="Features Table" :value="pairs_to_lines($item->tech_features)" rows="8"
                        hint="One row per line as  Label | Value  (e.g.  Brand | Ningjin APC Industries )." />
        </div>

        {{-- Dimensions --}}
        <div class="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 class="text-sm font-bold uppercase tracking-wide text-slate-400">Dimensions</h2>
            <x-textarea name="dimensions" label="Dimensions Table" :value="table_to_lines($item->dimensions)" rows="8"
                        hint="First line = column headers, each next line = a row. Separate cells with | . Example first line:  Size | DN | L | D | H" />
        </div>

        {{-- Materials & Standards --}}
        <div class="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 class="text-sm font-bold uppercase tracking-wide text-slate-400">Materials &amp; Standard List</h2>
            <x-textarea name="materials" label="Materials Table" :value="materials_to_lines($item->materials)" rows="10"
                        hint="One row per line as  No | Name | Material | Standard  (e.g.  1 | Gasket | C95400 | ASTM B148 )." />
        </div>

        <div class="flex gap-3">
            <button class="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600">Save</button>
            <a href="{{ route('admin.featured-products.index') }}" class="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</a>
        </div>
    </form>
@endsection

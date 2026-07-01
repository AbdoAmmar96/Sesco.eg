@extends('admin.layout')
@section('title', $item->exists ? 'Edit Featured Product' : 'Add Featured Product')

@section('content')
    <a href="{{ route('admin.featured-products.index') }}" class="text-sm font-semibold text-slate-500 hover:text-navy-900">← Back to featured products</a>

    <form method="POST" action="{{ $item->exists ? route('admin.featured-products.update', $item) : route('admin.featured-products.store') }}"
          enctype="multipart/form-data" class="mt-4 max-w-xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
        @csrf
        @if ($item->exists) @method('PUT') @endif

        <x-select name="product_category_id" label="Shown In" :options="$categories" :selected="$item->product_category_id" />
        <x-input name="name" label="Product Name" :value="$item->name" required />
        <x-input name="spec" label="Spec / Subtitle" :value="$item->spec" hint="Optional, e.g. DI Flanged" />
        <x-input name="icon" label="Icon" :value="$item->icon" hint="Lucide icon key, e.g. pump, valve, detector" />
        <x-upload name="image" label="Product Image" :current="$item->image" />
        <x-input name="sort_order" label="Sort Order" type="number" :value="$item->sort_order ?? 0" />
        <x-check :checked="$item->is_active ?? true" />

        <div class="flex gap-3 pt-2">
            <button class="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600">Save</button>
            <a href="{{ route('admin.featured-products.index') }}" class="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</a>
        </div>
    </form>
@endsection

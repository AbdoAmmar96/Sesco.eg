@extends('admin.layout')
@section('title', $item->exists ? 'Edit Product Group' : 'Add Product Group')

@section('content')
    <a href="{{ route('admin.product-groups.index') }}" class="text-sm font-semibold text-slate-500 hover:text-navy-900">← Back to product groups</a>

    <form method="POST" action="{{ $item->exists ? route('admin.product-groups.update', $item) : route('admin.product-groups.store') }}"
          enctype="multipart/form-data" class="mt-4 max-w-2xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
        @csrf
        @if ($item->exists) @method('PUT') @endif

        <x-select name="product_category_id" label="Category" :options="$categories" :selected="$item->product_category_id" required placeholder="Select category" />
        <x-input name="n" label="Number" type="number" :value="$item->n ?? 1" hint="The numbered badge (1,2,3...)" />
        <x-input name="title" label="Group Title" :value="$item->title" required />
        <x-textarea name="description" label="Description" :value="$item->description" />
        <x-input name="cta" label="CTA Text" :value="$item->cta" hint="e.g. View All Pump Products" />
        <x-textarea name="items" label="Items" :value="item_lines_text($item->items)" rows="6" hint="One per line:  Name | icon   (e.g.  Diesel Fire Pumps | pump)" />
        <x-input name="sort_order" label="Sort Order" type="number" :value="$item->sort_order ?? 0" />
        <x-check :checked="$item->is_active ?? true" />

        <div class="flex gap-3 pt-2">
            <button class="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600">Save</button>
            <a href="{{ route('admin.product-groups.index') }}" class="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</a>
        </div>
    </form>
@endsection

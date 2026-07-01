@extends('admin.layout')
@section('title', $item->exists ? 'Edit Category' : 'Add Category')

@section('content')
    <a href="{{ route('admin.product-categories.index') }}" class="text-sm font-semibold text-slate-500 hover:text-navy-900">← Back to product categories</a>

    <form method="POST" action="{{ $item->exists ? route('admin.product-categories.update', $item) : route('admin.product-categories.store') }}"
          enctype="multipart/form-data" class="mt-4 max-w-2xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
        @csrf
        @if ($item->exists) @method('PUT') @endif

        <x-input name="name" label="Category Name" :value="$item->name" required />
        <x-input name="slug" label="Slug" :value="$item->slug" hint="URL part, e.g. fire-fighting. Auto from name if blank." />
        <x-input name="icon" label="Icon" :value="$item->icon" hint="Lucide icon key, e.g. flame, bell, droplets" />
        <x-textarea name="short" label="Short (card text)" :value="$item->short" />
        <x-textarea name="intro" label="Intro (hero subtitle)" :value="$item->intro" />
        <x-upload name="hero_image" label="Hero Image" :current="$item->hero_image" />
        <x-textarea name="card_items" label="Card Items" :value="item_lines_text($item->card_items)" rows="5" hint="One per line:  Name | icon" />
        <x-textarea name="filters" label="Filters" :value="array_to_lines($item->filters)" rows="4" hint="One filter per line" />
        <x-textarea name="highlights" label="Highlights (optional)" :value="array_to_lines($item->highlights)" rows="3" hint="One per line, optional (hero badges)" />
        <x-input name="sort_order" label="Sort Order" type="number" :value="$item->sort_order ?? 0" />
        <x-check :checked="$item->is_active ?? true" />

        <div class="flex gap-3 pt-2">
            <button class="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600">Save</button>
            <a href="{{ route('admin.product-categories.index') }}" class="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</a>
        </div>
    </form>
@endsection

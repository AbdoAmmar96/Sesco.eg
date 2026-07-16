@extends('admin.layout')
@section('title', $item->exists ? 'Edit Service' : 'Add Service')

@section('content')
    <a href="{{ route('admin.services.index') }}" class="text-sm font-semibold text-slate-500 hover:text-navy-900">← Back to services</a>

    <form method="POST" action="{{ $item->exists ? route('admin.services.update', $item) : route('admin.services.store') }}"
          enctype="multipart/form-data" class="mt-4 max-w-xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
        @csrf
        @if ($item->exists) @method('PUT') @endif

        <x-input name="name" label="Service Name" :value="$item->name" required />
        <x-input name="icon" label="Icon" :value="$item->icon" hint="Lucide icon key, e.g. wrench, flame, droplet" />
        <x-upload name="image" label="Service Image" :current="$item->image"
                  hint="Used on the service card and as the hero background. Leave empty to keep the current image." />
        <x-textarea name="description" label="Description" :value="$item->description" />
        <x-input name="sort_order" label="Sort Order" type="number" :value="$item->sort_order ?? 0" />
        <x-check :checked="$item->is_active ?? true" />

        <div class="flex gap-3 pt-2">
            <button class="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600">Save</button>
            <a href="{{ route('admin.services.index') }}" class="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</a>
        </div>
    </form>
@endsection

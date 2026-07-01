@extends('admin.layout')
@section('title', $item->exists ? 'Edit Consultant' : 'Add Consultant')

@section('content')
    <a href="{{ route('admin.consultants.index') }}" class="text-sm font-semibold text-slate-500 hover:text-navy-900">← Back to consultants</a>

    <form method="POST" action="{{ $item->exists ? route('admin.consultants.update', $item) : route('admin.consultants.store') }}"
          enctype="multipart/form-data" class="mt-4 max-w-xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
        @csrf
        @if ($item->exists) @method('PUT') @endif

        <x-input name="name" label="Consultant Name" :value="$item->name" required />
        <x-upload name="logo" label="Logo" :current="$item->logo" hint="PNG/JPG, max 2MB. Leave empty to keep current." />
        <x-input name="sort_order" label="Sort Order" type="number" :value="$item->sort_order ?? 0" hint="Lower numbers appear first." />
        <x-check :checked="$item->is_active ?? true" />

        <div class="flex gap-3 pt-2">
            <button class="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600">Save</button>
            <a href="{{ route('admin.consultants.index') }}" class="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</a>
        </div>
    </form>
@endsection

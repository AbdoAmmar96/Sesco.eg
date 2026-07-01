@extends('admin.layout')
@section('title', $item->exists ? 'Edit Download' : 'Add Download')

@section('content')
    <a href="{{ route('admin.downloads.index') }}" class="text-sm font-semibold text-slate-500 hover:text-navy-900">← Back to downloads</a>

    <form method="POST" action="{{ $item->exists ? route('admin.downloads.update', $item) : route('admin.downloads.store') }}"
          enctype="multipart/form-data" class="mt-4 max-w-2xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
        @csrf
        @if ($item->exists) @method('PUT') @endif

        <x-input name="title" label="Title" :value="$item->title" required />
        <x-textarea name="description" label="Description" :value="$item->description" />
        <x-input name="icon" label="Icon" :value="$item->icon" hint="Lucide icon key, e.g. file-text, flame, award" />
        <x-input name="type" label="Type" :value="$item->type ?? 'PDF'" />
        <x-upload name="file" label="File (PDF/DOC/ZIP)" :current="$item->file_path" accept=".pdf,.doc,.docx,.zip" hint="Max 20MB. Leave empty to keep current." />
        <x-input name="sort_order" label="Sort Order" type="number" :value="$item->sort_order ?? 0" />
        <x-check />

        <div class="flex gap-3 pt-2">
            <button class="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600">Save</button>
            <a href="{{ route('admin.downloads.index') }}" class="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</a>
        </div>
    </form>
@endsection

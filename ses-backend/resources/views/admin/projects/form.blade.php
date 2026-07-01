@extends('admin.layout')
@section('title', $item->exists ? 'Edit Project' : 'Add Project')

@section('content')
    <a href="{{ route('admin.projects.index') }}" class="text-sm font-semibold text-slate-500 hover:text-navy-900">← Back to projects</a>

    <form method="POST" action="{{ $item->exists ? route('admin.projects.update', $item) : route('admin.projects.store') }}"
          enctype="multipart/form-data" class="mt-4 max-w-2xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
        @csrf
        @if ($item->exists) @method('PUT') @endif

        <x-input name="title" label="Project Title" :value="$item->title" required />
        <x-select name="category" label="Category" :options="collect($categories)->mapWithKeys(fn($c)=>[$c=>$c])->all()" :selected="$item->category" placeholder="Select category" />
        <x-input name="tags" label="Tags" :value="implode(', ', $item->tags ?? [])" hint="Comma-separated, e.g. Fire Fighting, Water Networks" />
        <x-textarea name="description" label="Description" :value="$item->description" />
        <x-input name="icon" label="Icon" :value="$item->icon" hint="Lucide icon key, e.g. building, factory, hospital" />
        <x-upload name="image" label="Project Image" :current="$item->image" />
        <x-input name="sort_order" label="Sort Order" type="number" :value="$item->sort_order ?? 0" />
        <x-check :checked="$item->is_active ?? true" />

        <div class="flex gap-3 pt-2">
            <button class="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600">Save</button>
            <a href="{{ route('admin.projects.index') }}" class="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</a>
        </div>
    </form>
@endsection

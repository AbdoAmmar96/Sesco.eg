@extends('admin.layout')
@section('title', $item->exists ? 'Edit Content Block' : 'Add Content Block')

@section('content')
    <a href="{{ route('admin.content-blocks.index') }}" class="text-sm font-semibold text-slate-500 hover:text-navy-900">← Back to content blocks</a>

    <form method="POST" action="{{ $item->exists ? route('admin.content-blocks.update', $item) : route('admin.content-blocks.store') }}"
          enctype="multipart/form-data" class="mt-4 max-w-2xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
        @csrf
        @if ($item->exists) @method('PUT') @endif

        <x-select name="group" label="Section" :options="\App\Models\ContentBlock::GROUPS" :selected="$item->group" required placeholder="Select section" />
        <x-input name="title" label="Title / Name" :value="$item->title" hint="e.g. Fire Fighting Systems, Our Mission, ISO" />
        <x-textarea name="subtitle" label="Subtitle / Description" :value="$item->subtitle" />
        <x-input name="icon" label="Icon" :value="$item->icon" hint="Lucide icon key" />
        <x-input name="value" label="Value" :value="$item->value" hint="Stat number (e.g. 10+) or certification standard" />
        <x-input name="label" label="Label" :value="$item->label" hint="Stat label / certification description" />
        <x-input name="sort_order" label="Sort Order" type="number" :value="$item->sort_order ?? 0" />
        <x-check :checked="$item->is_active ?? true" />

        <div class="flex gap-3 pt-2">
            <button class="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600">Save</button>
            <a href="{{ route('admin.content-blocks.index') }}" class="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</a>
        </div>
    </form>
@endsection

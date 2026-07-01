@extends('admin.layout')
@section('title', 'Content Blocks')

@section('content')
    <div class="mb-5 flex items-center justify-between">
        <p class="text-sm text-slate-500">Editable text snippets, stats, and certifications grouped by website section.</p>
        <a href="{{ route('admin.content-blocks.create') }}" class="rounded-lg bg-brand-orange px-4 py-2 text-sm font-bold text-white hover:bg-orange-600">+ Add Content Block</a>
    </div>

    @forelse ($groups as $groupKey => $blocks)
        <div class="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div class="border-b border-slate-100 px-4 py-3">
                <h2 class="text-sm font-bold text-navy-900">{{ \App\Models\ContentBlock::GROUPS[$groupKey] ?? $groupKey }}</h2>
            </div>
            <table class="w-full text-left text-sm">
                <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                        <th class="px-4 py-3">Title</th>
                        <th class="px-4 py-3">Value</th>
                        <th class="px-4 py-3">Label</th>
                        <th class="px-4 py-3">Order</th>
                        <th class="px-4 py-3">Status</th>
                        <th class="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @foreach ($blocks as $b)
                        <tr class="hover:bg-slate-50">
                            <td class="px-4 py-3 font-semibold text-navy-900">{{ $b->title ?: '—' }}</td>
                            <td class="px-4 py-3 text-slate-500">{{ $b->value ?: '—' }}</td>
                            <td class="px-4 py-3 text-slate-500">{{ $b->label ?: '—' }}</td>
                            <td class="px-4 py-3 text-slate-500">{{ $b->sort_order }}</td>
                            <td class="px-4 py-3">
                                <span class="rounded-full px-2.5 py-1 text-xs font-bold {{ $b->is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400' }}">
                                    {{ $b->is_active ? 'Active' : 'Hidden' }}
                                </span>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <a href="{{ route('admin.content-blocks.edit', $b) }}" class="font-semibold text-brand-royal hover:underline">Edit</a>
                                <form method="POST" action="{{ route('admin.content-blocks.destroy', $b) }}" class="ml-3 inline" onsubmit="return confirm('Delete this content block?')">
                                    @csrf @method('DELETE')
                                    <button class="font-semibold text-red-600 hover:underline">Delete</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    @empty
        <div class="rounded-xl border border-slate-200 bg-white px-4 py-12 text-center text-slate-400">No content blocks yet.</div>
    @endforelse
@endsection

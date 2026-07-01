@extends('admin.layout')
@section('title', 'Featured Products')

@section('content')
    <div class="mb-5 flex items-center justify-between">
        <p class="text-sm text-slate-500">Highlighted products shown on the home page and within product categories.</p>
        <a href="{{ route('admin.featured-products.create') }}" class="rounded-lg bg-brand-orange px-4 py-2 text-sm font-bold text-white hover:bg-orange-600">+ Add Featured Product</a>
    </div>

    <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                    <th class="px-4 py-3">Image</th>
                    <th class="px-4 py-3">Name</th>
                    <th class="px-4 py-3">Spec</th>
                    <th class="px-4 py-3">Context</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                @forelse ($items as $it)
                    <tr class="hover:bg-slate-50">
                        <td class="px-4 py-3">
                            @if ($it->image)
                                <img src="{{ media_preview($it->image) }}" alt="{{ $it->name }}" class="h-10 w-10 rounded object-cover">
                            @else
                                <span class="text-xs text-slate-400">—</span>
                            @endif
                        </td>
                        <td class="px-4 py-3 font-semibold text-navy-900">{{ $it->name }}</td>
                        <td class="px-4 py-3 text-slate-500">{{ $it->spec ?: '—' }}</td>
                        <td class="px-4 py-3 text-slate-500">{{ optional($it->category)->name ?: 'Home' }}</td>
                        <td class="px-4 py-3">
                            <span class="rounded-full px-2.5 py-1 text-xs font-bold {{ $it->is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400' }}">
                                {{ $it->is_active ? 'Active' : 'Hidden' }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-right">
                            <a href="{{ route('admin.featured-products.edit', $it) }}" class="font-semibold text-brand-royal hover:underline">Edit</a>
                            <form method="POST" action="{{ route('admin.featured-products.destroy', $it) }}" class="ml-3 inline" onsubmit="return confirm('Delete this featured product?')">
                                @csrf @method('DELETE')
                                <button class="font-semibold text-red-600 hover:underline">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="6" class="px-4 py-12 text-center text-slate-400">No featured products yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection

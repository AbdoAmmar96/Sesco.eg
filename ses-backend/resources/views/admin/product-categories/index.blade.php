@extends('admin.layout')
@section('title', 'Product Categories')

@section('content')
    <div class="mb-5 flex items-center justify-between">
        <p class="text-sm text-slate-500">Top-level product categories shown across the website's product sections.</p>
        <a href="{{ route('admin.product-categories.create') }}" class="rounded-lg bg-brand-orange px-4 py-2 text-sm font-bold text-white hover:bg-orange-600">+ Add Category</a>
    </div>

    <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                    <th class="px-4 py-3">Name</th>
                    <th class="px-4 py-3">Slug</th>
                    <th class="px-4 py-3">Groups</th>
                    <th class="px-4 py-3">Featured</th>
                    <th class="px-4 py-3">Order</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                @forelse ($items as $it)
                    <tr class="hover:bg-slate-50">
                        <td class="px-4 py-3 font-semibold text-navy-900">{{ $it->name }}</td>
                        <td class="px-4 py-3 text-slate-500">{{ $it->slug }}</td>
                        <td class="px-4 py-3 text-slate-500">{{ $it->groups_count }}</td>
                        <td class="px-4 py-3 text-slate-500">{{ $it->featured_count }}</td>
                        <td class="px-4 py-3 text-slate-500">{{ $it->sort_order }}</td>
                        <td class="px-4 py-3">
                            <span class="rounded-full px-2.5 py-1 text-xs font-bold {{ $it->is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400' }}">
                                {{ $it->is_active ? 'Active' : 'Hidden' }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-right">
                            <a href="{{ route('admin.product-categories.edit', $it) }}" class="font-semibold text-brand-royal hover:underline">Edit</a>
                            <form method="POST" action="{{ route('admin.product-categories.destroy', $it) }}" class="ml-3 inline" onsubmit="return confirm('Delete this category (with its groups & featured products)?')">
                                @csrf @method('DELETE')
                                <button class="font-semibold text-red-600 hover:underline">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="7" class="px-4 py-12 text-center text-slate-400">No product categories yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection

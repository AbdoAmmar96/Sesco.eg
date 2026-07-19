@extends('admin.layout')
@section('title', 'Products')

@section('content')
    <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <div class="relative w-full sm:w-80">
            <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔎</span>
            <input id="product-search" type="search" autofocus placeholder="Search products, category or group…"
                   class="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange">
        </div>
        <a href="{{ route('admin.products.create') }}"
           class="shrink-0 rounded-lg bg-brand-orange px-4 py-2 text-center text-sm font-bold text-white hover:bg-orange-600">+ Add Product</a>
    </div>

    <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                    <th class="px-4 py-3">Image</th>
                    <th class="px-4 py-3">Product</th>
                    <th class="px-4 py-3">Category</th>
                    <th class="px-4 py-3">Group</th>
                    <th class="px-4 py-3">Datasheet</th>
                    <th class="px-4 py-3 text-right">Action</th>
                </tr>
            </thead>
            <tbody id="product-rows" class="divide-y divide-slate-100">
                @forelse ($products as $p)
                    <tr class="product-row hover:bg-slate-50"
                        data-search="{{ Str::lower($p['name'].' '.$p['category'].' '.$p['groupTitle'].' '.$p['icon']) }}">
                        <td class="px-4 py-3">
                            @if ($p['image'])
                                <img src="{{ media_preview($p['image']) }}" alt="" class="h-10 w-10 rounded border border-slate-100 bg-white object-contain">
                            @else
                                <span class="flex h-10 w-10 items-center justify-center rounded bg-slate-100 text-[10px] text-slate-400">{{ $p['icon'] }}</span>
                            @endif
                        </td>
                        <td class="px-4 py-3 font-semibold text-navy-900">{{ $p['name'] }}</td>
                        <td class="px-4 py-3 text-slate-500">{{ $p['category'] }}</td>
                        <td class="px-4 py-3 text-slate-500">{{ $p['groupTitle'] }}</td>
                        <td class="px-4 py-3">
                            @if ($p['hasData'])
                                <span class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">✓ {{ $p['specs'] }} specs</span>
                                @if ($p['drawings'])<span class="ml-1 text-xs text-slate-400">{{ $p['drawings'] }} drawings</span>@endif
                            @else
                                <span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-400">basic</span>
                            @endif
                        </td>
                        <td class="px-4 py-3 text-right">
                            <a href="{{ route('admin.products.edit', [$p['group'], $p['index']]) }}"
                               class="font-semibold text-brand-royal hover:underline">Edit</a>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="6" class="px-4 py-12 text-center text-slate-400">No products yet — add items to a product group first.</td></tr>
                @endforelse
            </tbody>
        </table>
        <p id="product-empty" class="hidden px-4 py-10 text-center text-sm text-slate-400">No products match your search.</p>
    </div>
@endsection

@push('scripts')
<script>
(function () {
    const input = document.getElementById('product-search')
    const rows = Array.from(document.querySelectorAll('.product-row'))
    const empty = document.getElementById('product-empty')
    if (!input) return

    input.addEventListener('input', function () {
        const q = input.value.trim().toLowerCase()
        let shown = 0
        rows.forEach((r) => {
            const match = !q || r.dataset.search.includes(q)
            r.classList.toggle('hidden', !match)
            if (match) shown++
        })
        empty.classList.toggle('hidden', shown !== 0)
    })
})()
</script>
@endpush

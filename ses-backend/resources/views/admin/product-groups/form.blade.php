@extends('admin.layout')
@section('title', $item->exists ? 'Edit Product Group' : 'Add Product Group')

@php
    // Repeater rows: old() input wins after a validation error, otherwise the
    // saved items. Uploaded files can't be repopulated by old(), so the current
    // image path rides along in a hidden field per row.
    $rows = old('items', collect($item->items ?? [])->map(fn ($it) => [
        'name' => $it['name'] ?? '',
        'icon' => $it['icon'] ?? 'box',
        'image_current' => $it['image'] ?? '',
    ])->all());
@endphp

@section('content')
    <a href="{{ route('admin.product-groups.index') }}" class="text-sm font-semibold text-slate-500 hover:text-navy-900">← Back to product groups</a>

    <form method="POST" action="{{ $item->exists ? route('admin.product-groups.update', $item) : route('admin.product-groups.store') }}"
          enctype="multipart/form-data" class="mt-4 max-w-3xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
        @csrf
        @if ($item->exists) @method('PUT') @endif

        <x-select name="product_category_id" label="Category" :options="$categories" :selected="$item->product_category_id" required placeholder="Select category" />
        <x-input name="n" label="Number" type="number" :value="$item->n ?? 1" hint="The numbered badge (1,2,3...)" />
        <x-input name="title" label="Group Title" :value="$item->title" required />
        <x-textarea name="description" label="Description" :value="$item->description" />
        <x-input name="cta" label="CTA Text" :value="$item->cta" hint="e.g. View All Pump Products" />

        <div>
            <label class="mb-1 block text-sm font-semibold text-navy-800">Items</label>
            <p class="mb-3 text-xs text-slate-400">
                Each item becomes a product tile on the site. Upload an image per item — leave the file
                empty to keep the current one. Items with no image fall back to
                <code class="rounded bg-slate-100 px-1">/images/p-&lt;name&gt;.jpg</code>, then to the icon.
            </p>

            <div id="items-rows" data-next="{{ count($rows) }}" class="space-y-3">
                @foreach ($rows as $i => $row)
                    @include('admin.product-groups._item-row', ['i' => $i, 'row' => $row])
                @endforeach
            </div>

            @error('items')<p class="mt-1 text-xs text-red-600">{{ $message }}</p>@enderror

            <button type="button" id="items-add"
                    class="mt-3 rounded-lg border border-dashed border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-brand-orange hover:text-brand-orange">
                + Add item
            </button>
        </div>

        <x-input name="sort_order" label="Sort Order" type="number" :value="$item->sort_order ?? 0" />
        <x-check :checked="$item->is_active ?? true" />

        <div class="flex gap-3 pt-2">
            <button class="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600">Save</button>
            <a href="{{ route('admin.product-groups.index') }}" class="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</a>
        </div>
    </form>

    {{-- Blank row stamped out by the "Add item" button. --}}
    <template id="items-template">
        @include('admin.product-groups._item-row', ['i' => '__INDEX__', 'row' => ['name' => '', 'icon' => '', 'image_current' => '']])
    </template>
@endsection

@push('scripts')
<script>
(function () {
    const rows = document.getElementById('items-rows')
    const template = document.getElementById('items-template')
    let next = Number(rows.dataset.next || 0)

    document.getElementById('items-add').addEventListener('click', function () {
        rows.insertAdjacentHTML('beforeend', template.innerHTML.replaceAll('__INDEX__', next++))
        rows.lastElementChild.querySelector('input[type="text"]').focus()
    })

    // A removed row simply stops being submitted — the server rebuilds the
    // items list from whatever rows arrive.
    rows.addEventListener('click', function (e) {
        const button = e.target.closest('.item-remove')
        if (button) button.closest('.item-row').remove()
    })

    // Show the picked file straight away so a mis-picked image is obvious
    // before saving.
    rows.addEventListener('change', function (e) {
        if (!e.target.matches('input[type="file"]')) return
        const file = e.target.files[0]
        const preview = e.target.closest('.item-row').querySelector('.item-preview')
        if (file && preview) {
            preview.src = URL.createObjectURL(file)
            preview.classList.remove('hidden')
        }
    })
})()
</script>
@endpush

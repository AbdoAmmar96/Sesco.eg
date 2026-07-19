{{-- Reusable "Technical Drawings" repeater. Expects $diagrams (array of
     {image, caption}). Used by the featured-product form and the product
     item editor. --}}
@php
    $diagRows = old('diagrams', collect($diagrams ?? [])->map(fn ($d) => [
        'caption' => $d['caption'] ?? '',
        'image_current' => $d['image'] ?? '',
    ])->all());
@endphp

<div class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
    <h2 class="text-sm font-bold uppercase tracking-wide text-slate-400">Technical Drawings</h2>
    <p class="text-xs text-slate-400">
        Labelled drawings shown in the product's “Technical Drawings” section — e.g. a
        structure / cross-section image and a dimensions drawing. Add an image and give it a
        caption. Leave an existing row's file empty to keep its current image.
    </p>

    <div id="diagrams-rows" data-next="{{ count($diagRows) }}" class="space-y-3">
        @foreach ($diagRows as $i => $row)
            @include('admin.partials._diagram-row', ['i' => $i, 'row' => $row])
        @endforeach
    </div>

    <button type="button" id="diagrams-add"
            class="rounded-lg border border-dashed border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-brand-orange hover:text-brand-orange">
        + Add drawing
    </button>
</div>

<template id="diagrams-template">
    @include('admin.partials._diagram-row', ['i' => '__DINDEX__', 'row' => ['caption' => '', 'image_current' => '']])
</template>

@push('scripts')
<script>
(function () {
    const rows = document.getElementById('diagrams-rows')
    if (!rows) return
    const template = document.getElementById('diagrams-template')
    let next = Number(rows.dataset.next || 0)

    document.getElementById('diagrams-add').addEventListener('click', function () {
        rows.insertAdjacentHTML('beforeend', template.innerHTML.replaceAll('__DINDEX__', next++))
    })
    rows.addEventListener('click', function (e) {
        const btn = e.target.closest('.diagram-remove')
        if (btn) btn.closest('.diagram-row').remove()
    })
    rows.addEventListener('change', function (e) {
        if (!e.target.matches('input[type="file"]')) return
        const file = e.target.files[0]
        const preview = e.target.closest('.diagram-row').querySelector('.diagram-preview')
        if (file && preview) {
            preview.src = URL.createObjectURL(file)
            preview.classList.remove('hidden')
        }
    })
})()
</script>
@endpush

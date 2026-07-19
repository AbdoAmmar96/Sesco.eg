{{-- One technical-drawing row. $i is the row index (or __DINDEX__ in the
     <template> the Add button clones). --}}
@php($preview = media_preview($row['image_current'] ?? null))
<div class="diagram-row rounded-xl border border-slate-200 bg-slate-50 p-3">
    <div class="flex items-start gap-3">
        <img src="{{ $preview }}" alt=""
             class="diagram-preview h-16 w-16 shrink-0 rounded-lg border border-slate-200 bg-white object-contain p-1 {{ $preview ? '' : 'hidden' }}">

        <div class="grid min-w-0 flex-1 gap-2">
            <input type="text" name="diagrams[{{ $i }}][caption]" value="{{ $row['caption'] ?? '' }}"
                   placeholder="Caption (e.g. Structure &amp; Materials)"
                   class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange">
            <input type="file" name="diagrams[{{ $i }}][image]" accept="image/*"
                   class="block w-full text-xs text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-navy-900 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-navy-800">
            <input type="hidden" name="diagrams[{{ $i }}][image_current]" value="{{ $row['image_current'] ?? '' }}">
        </div>

        <button type="button" title="Remove drawing"
                class="diagram-remove shrink-0 rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm font-bold text-slate-400 hover:border-red-300 hover:bg-red-50 hover:text-red-600">
            ✕
        </button>
    </div>
</div>

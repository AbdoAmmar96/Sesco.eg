{{-- One repeater row. $i is the row index (or the literal __INDEX__ placeholder
     inside the <template> the Add button clones). --}}
@php($preview = media_preview($row['image_current'] ?? null))
<div class="item-row rounded-xl border border-slate-200 bg-slate-50 p-3">
    <div class="flex items-start gap-3">
        <img src="{{ $preview }}" alt=""
             class="item-preview h-16 w-16 shrink-0 rounded-lg border border-slate-200 bg-white object-contain p-1 {{ $preview ? '' : 'hidden' }}">

        <div class="grid min-w-0 flex-1 gap-2 sm:grid-cols-2">
            <input type="text" name="items[{{ $i }}][name]" value="{{ $row['name'] ?? '' }}"
                   placeholder="Product name"
                   class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange">
            <input type="text" name="items[{{ $i }}][icon]" value="{{ $row['icon'] ?? '' }}"
                   placeholder="Icon (e.g. pump)"
                   class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange">

            <div class="sm:col-span-2">
                <input type="file" name="items[{{ $i }}][image]" accept="image/*"
                       class="block w-full text-xs text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-navy-900 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-navy-800">
                <input type="hidden" name="items[{{ $i }}][image_current]" value="{{ $row['image_current'] ?? '' }}">
                <input type="hidden" name="items[{{ $i }}][payload]" value="{{ $row['payload'] ?? '' }}">
            </div>

            @php($ds = json_decode($row['payload'] ?? '', true))
            @if (is_array($ds) && (($ds['overview'] ?? null) || !empty($ds['techFeatures']) || !empty($ds['diagrams'])))
                <div class="sm:col-span-2 flex flex-wrap items-center gap-2 text-[11px]">
                    <span class="rounded bg-green-100 px-1.5 py-0.5 font-semibold text-green-700">datasheet ✓</span>
                    @if (!empty($ds['techFeatures']))<span class="text-slate-400">{{ count($ds['techFeatures']) }} specs</span>@endif
                    @if (!empty($ds['diagrams']))<span class="text-slate-400">· {{ count($ds['diagrams']) }} drawings</span>@endif
                    <span class="text-slate-300">— edit full data in Products</span>
                </div>
            @endif
        </div>

        <button type="button" title="Remove item"
                class="item-remove shrink-0 rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm font-bold text-slate-400 hover:border-red-300 hover:bg-red-50 hover:text-red-600">
            ✕
        </button>
    </div>

    @error("items.{$i}.image")<p class="mt-1 text-xs text-red-600">{{ $message }}</p>@enderror
    @error("items.{$i}.name")<p class="mt-1 text-xs text-red-600">{{ $message }}</p>@enderror
</div>

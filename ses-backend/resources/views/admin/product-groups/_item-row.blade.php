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
            </div>
        </div>

        <button type="button" title="Remove item"
                class="item-remove shrink-0 rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm font-bold text-slate-400 hover:border-red-300 hover:bg-red-50 hover:text-red-600">
            ✕
        </button>
    </div>

    @error("items.{$i}.image")<p class="mt-1 text-xs text-red-600">{{ $message }}</p>@enderror
    @error("items.{$i}.name")<p class="mt-1 text-xs text-red-600">{{ $message }}</p>@enderror
</div>

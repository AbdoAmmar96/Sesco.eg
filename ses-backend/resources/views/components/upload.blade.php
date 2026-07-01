@props(['name', 'label' => 'Image', 'current' => null, 'accept' => 'image/*', 'hint' => 'Leave empty to keep the current file.'])
@php($preview = media_preview($current))
<div>
    <label class="mb-1 block text-sm font-semibold text-navy-800">{{ $label }}</label>
    @if ($preview)
        <img src="{{ $preview }}" alt="" class="mb-2 h-20 max-w-[180px] rounded-lg border border-slate-200 bg-slate-50 object-contain p-1">
    @endif
    <input type="file" name="{{ $name }}" accept="{{ $accept }}"
        class="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-navy-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-navy-800">
    @if ($hint)<p class="mt-1 text-xs text-slate-400">{{ $hint }}</p>@endif
    @error($name)<p class="mt-1 text-xs text-red-600">{{ $message }}</p>@enderror
</div>

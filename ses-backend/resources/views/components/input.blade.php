@props(['name', 'label' => null, 'value' => '', 'type' => 'text', 'required' => false, 'placeholder' => '', 'hint' => null])
<div>
    @if ($label)
        <label class="mb-1 block text-sm font-semibold text-navy-800">{{ $label }} @if ($required)<span class="text-red-500">*</span>@endif</label>
    @endif
    <input type="{{ $type }}" name="{{ $name }}" value="{{ old($name, $value) }}" placeholder="{{ $placeholder }}" {{ $required ? 'required' : '' }}
        {{ $attributes->merge(['class' => 'w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-brand-orange '.($errors->has($name) ? 'border-red-400' : 'border-slate-300')]) }}>
    @if ($hint)<p class="mt-1 text-xs text-slate-400">{{ $hint }}</p>@endif
    @error($name)<p class="mt-1 text-xs text-red-600">{{ $message }}</p>@enderror
</div>

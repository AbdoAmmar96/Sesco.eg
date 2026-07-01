@props(['name', 'label' => null, 'options' => [], 'selected' => null, 'required' => false, 'placeholder' => null])
<div>
    @if ($label)
        <label class="mb-1 block text-sm font-semibold text-navy-800">{{ $label }} @if ($required)<span class="text-red-500">*</span>@endif</label>
    @endif
    <select name="{{ $name }}" {{ $required ? 'required' : '' }}
        {{ $attributes->merge(['class' => 'w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-brand-orange '.($errors->has($name) ? 'border-red-400' : 'border-slate-300')]) }}>
        @if ($placeholder)<option value="">{{ $placeholder }}</option>@endif
        @foreach ($options as $val => $text)
            <option value="{{ $val }}" {{ (string) old($name, $selected) === (string) $val ? 'selected' : '' }}>{{ $text }}</option>
        @endforeach
    </select>
    @error($name)<p class="mt-1 text-xs text-red-600">{{ $message }}</p>@enderror
</div>

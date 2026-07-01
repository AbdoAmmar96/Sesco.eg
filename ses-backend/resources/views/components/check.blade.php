@props(['name' => 'is_active', 'label' => 'Active (visible on the website)', 'checked' => true])
<label class="flex items-center gap-2 text-sm font-medium text-navy-800">
    <input type="hidden" name="{{ $name }}" value="0">
    <input type="checkbox" name="{{ $name }}" value="1" {{ old($name, $checked) ? 'checked' : '' }} class="h-4 w-4 rounded border-slate-300 text-brand-orange">
    {{ $label }}
</label>

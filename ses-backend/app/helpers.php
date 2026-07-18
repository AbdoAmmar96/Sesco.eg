<?php

use Illuminate\Support\Str;

if (! function_exists('media_preview')) {
    /**
     * Resolve a stored media path to a URL usable inside the admin (served on :8000).
     * Frontend public assets (/images/...) are loaded from the frontend origin.
     */
    function media_preview(?string $path): ?string
    {
        if (! $path) {
            return null;
        }
        if (Str::startsWith($path, ['http://', 'https://'])) {
            return $path;
        }
        if (Str::startsWith($path, '/images/')) {
            return rtrim(config('app.frontend_url'), '/').$path;
        }

        return $path; // /storage/... — same origin as the admin
    }
}

if (! function_exists('parse_item_lines')) {
    /** Parse "Name | icon" lines into [['name'=>.., 'icon'=>..], ...]. */
    function parse_item_lines(?string $text): array
    {
        return collect(preg_split('/\r\n|\r|\n/', (string) $text))
            ->map(fn ($l) => trim($l))->filter()
            ->map(function ($l) {
                $p = array_map('trim', explode('|', $l, 2));

                return ['name' => $p[0], 'icon' => $p[1] ?? 'box'];
            })->values()->all();
    }
}

if (! function_exists('item_lines_text')) {
    /** Inverse of parse_item_lines() — for editing in a textarea. */
    function item_lines_text($items): string
    {
        return collect($items ?? [])
            ->map(fn ($it) => ($it['name'] ?? '').' | '.($it['icon'] ?? 'box'))
            ->implode("\n");
    }
}

if (! function_exists('lines_to_array')) {
    /** One value per line -> trimmed array of strings. */
    function lines_to_array(?string $text): array
    {
        return collect(preg_split('/\r\n|\r|\n/', (string) $text))
            ->map(fn ($l) => trim($l))->filter()->values()->all();
    }
}

if (! function_exists('array_to_lines')) {
    function array_to_lines($arr): string
    {
        return collect($arr ?? [])->implode("\n");
    }
}

if (! function_exists('pairs_to_lines')) {
    /** Inverse of the "Label | Value" parser — one pair per line. */
    function pairs_to_lines($pairs): string
    {
        return collect($pairs ?? [])
            ->map(fn ($p) => ($p['label'] ?? '').' | '.($p['value'] ?? ''))
            ->implode("\n");
    }
}

if (! function_exists('materials_to_lines')) {
    /** Inverse of the materials parser — "No | Name | Material | Standard". */
    function materials_to_lines($rows): string
    {
        return collect($rows ?? [])
            ->map(fn ($r) => implode(' | ', [
                $r['no'] ?? '', $r['name'] ?? '', $r['material'] ?? '', $r['standard'] ?? '',
            ]))
            ->implode("\n");
    }
}

if (! function_exists('table_to_lines')) {
    /** Inverse of parseTable — header line followed by one line per row. */
    function table_to_lines($table): string
    {
        if (empty($table['columns'])) {
            return '';
        }
        $lines = [implode(' | ', $table['columns'])];
        foreach ($table['rows'] ?? [] as $row) {
            $lines[] = implode(' | ', (array) $row);
        }

        return implode("\n", $lines);
    }
}

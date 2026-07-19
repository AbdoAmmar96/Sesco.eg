<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\ProductGroup;
use Illuminate\Http\Request;

/**
 * Manages individual products (the items inside every product group) — the
 * full catalogue. Each product's data, image, icon and datasheet sections
 * (overview, highlights, technical features, dimensions, materials, technical
 * drawings) are edited here. A product is addressed by its group + item index.
 */
class ProductItemController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        $groups = ProductGroup::with('category')
            ->orderBy('product_category_id')->orderBy('sort_order')->get();

        $products = [];
        foreach ($groups as $group) {
            foreach (($group->items ?? []) as $idx => $it) {
                $products[] = [
                    'group' => $group,
                    'index' => $idx,
                    'name' => $it['name'] ?? '',
                    'icon' => $it['icon'] ?? 'box',
                    'image' => $it['image'] ?? null,
                    'category' => optional($group->category)->name ?? '—',
                    'groupTitle' => $group->title,
                    'specs' => is_array($it['techFeatures'] ?? null) ? count($it['techFeatures']) : 0,
                    'drawings' => is_array($it['diagrams'] ?? null) ? count($it['diagrams']) : 0,
                    'hasData' => ! empty($it['overview']) || ! empty($it['techFeatures']),
                ];
            }
        }

        return view('admin.products.index', compact('products'));
    }

    public function create()
    {
        return view('admin.products.form', [
            'creating' => true,
            'groupOptions' => $this->groupOptions(),
            'group' => null,
            'index' => null,
            'item' => [],
            'diagrams' => [],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate($this->rules() + ['product_group_id' => ['required', 'exists:product_groups,id']]);

        $group = ProductGroup::findOrFail($request->product_group_id);
        $items = $group->items ?? [];
        $items[] = $this->buildItem($request, []);
        $group->update(['items' => $items]);

        return redirect()->route('admin.products.index')->with('ok', "Product “{$request->name}” added.");
    }

    public function edit(ProductGroup $productGroup, int $index)
    {
        $items = $productGroup->items ?? [];
        abort_unless(isset($items[$index]), 404);

        $item = $items[$index];

        // Seed the drawings repeater from diagrams[], falling back to a legacy
        // single diagram image so nothing is hidden from the editor.
        $diagrams = $item['diagrams'] ?? [];
        if (empty($diagrams) && ! empty($item['diagramImage'])) {
            $diagrams = [['image' => $item['diagramImage'], 'caption' => $item['diagramCaption'] ?? null]];
        }

        return view('admin.products.form', [
            'creating' => false,
            'group' => $productGroup,
            'index' => $index,
            'item' => $item,
            'diagrams' => $diagrams,
        ]);
    }

    public function update(Request $request, ProductGroup $productGroup, int $index)
    {
        $items = $productGroup->items ?? [];
        abort_unless(isset($items[$index]), 404);

        $request->validate($this->rules());

        $items[$index] = $this->buildItem($request, $items[$index]);
        $productGroup->update(['items' => $items]);

        return redirect()->route('admin.products.index')
            ->with('ok', "Product “{$request->name}” updated.");
    }

    /** Shared validation rules for creating & updating a product item. */
    private function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:160'],
            'spec' => ['nullable', 'string', 'max:160'],
            'icon' => ['nullable', 'string', 'max:60'],
            'image' => ['nullable', 'image', 'max:12288'],
            'overview' => ['nullable', 'string', 'max:5000'],
            'highlights' => ['nullable', 'string', 'max:2000'],
            'tech_features' => ['nullable', 'string', 'max:8000'],
            'dimensions' => ['nullable', 'string', 'max:8000'],
            'materials' => ['nullable', 'string', 'max:8000'],
            'diagrams.*.image' => ['nullable', 'image', 'max:12288'],
            'diagrams.*.caption' => ['nullable', 'string', 'max:255'],
        ];
    }

    /**
     * Build a product item from the request, merged onto $base so an edit keeps
     * any fields not on the form. Empty keys are dropped to keep the JSON tidy.
     */
    private function buildItem(Request $request, array $base): array
    {
        $base['name'] = $request->name;
        $base['spec'] = $request->spec ?: null;
        $base['icon'] = $request->icon ?: 'box';
        $base['overview'] = $request->overview ?: null;
        $base['highlights'] = lines_to_array($request->highlights) ?: null;
        $base['techFeatures'] = $this->parsePairs($request->tech_features) ?: null;
        $base['dimensions'] = $this->parseTable($request->dimensions);
        $base['materials'] = $this->parseMaterials($request->materials) ?: null;
        $base['diagrams'] = $this->diagramRows($request, 'groups') ?: null;

        if ($path = $this->storeUpload($request, 'image', 'groups')) {
            $base['image'] = $path;
        }

        return array_filter($base, fn ($v) => $v !== null && $v !== '' && $v !== []);
    }

    /** Group picker options: "Category → Group Title" keyed by group id. */
    private function groupOptions(): array
    {
        return ProductGroup::with('category')
            ->orderBy('product_category_id')->orderBy('sort_order')->get()
            ->mapWithKeys(fn ($g) => [$g->id => (optional($g->category)->name ?? '—').' → '.$g->title])
            ->all();
    }

    /** "Label | Value" per line → [['label'=>.., 'value'=>..], ...]. */
    private function parsePairs(?string $text): array
    {
        return collect(preg_split('/\r\n|\r|\n/', (string) $text))
            ->map(fn ($l) => trim($l))->filter()
            ->map(function ($l) {
                $p = array_map('trim', explode('|', $l, 2));

                return ['label' => $p[0], 'value' => $p[1] ?? ''];
            })->values()->all();
    }

    /** "No | Name | Material | Standard" per line → list of assoc rows. */
    private function parseMaterials(?string $text): array
    {
        return collect(preg_split('/\r\n|\r|\n/', (string) $text))
            ->map(fn ($l) => trim($l))->filter()
            ->map(function ($l) {
                $p = array_map('trim', explode('|', $l));

                return ['no' => $p[0] ?? '', 'name' => $p[1] ?? '', 'material' => $p[2] ?? '', 'standard' => $p[3] ?? ''];
            })->values()->all();
    }

    /** Flexible table: first line = headers, following lines = rows; cells split on "|". */
    private function parseTable(?string $text): ?array
    {
        $lines = collect(preg_split('/\r\n|\r|\n/', (string) $text))
            ->map(fn ($l) => trim($l))->filter()->values();

        if ($lines->isEmpty()) {
            return null;
        }

        $split = fn ($l) => array_map('trim', explode('|', $l));

        return ['columns' => $split($lines->first()), 'rows' => $lines->slice(1)->map($split)->values()->all()];
    }
}

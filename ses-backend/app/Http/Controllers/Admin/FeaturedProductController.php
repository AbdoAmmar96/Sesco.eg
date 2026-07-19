<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\FeaturedProduct;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class FeaturedProductController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        $items = FeaturedProduct::with('category')
            ->orderByRaw('product_category_id is null desc')
            ->orderBy('product_category_id')
            ->orderBy('sort_order')
            ->get();

        return view('admin.featured-products.index', compact('items'));
    }

    public function create()
    {
        return view('admin.featured-products.form', ['item' => new FeaturedProduct(['is_active' => true]), 'categories' => $this->categoryOptions()]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        if ($path = $this->storeUpload($request, 'image', 'featured')) {
            $data['image'] = $path;
        }
        if ($path = $this->storeUpload($request, 'diagram_image', 'featured')) {
            $data['diagram_image'] = $path;
        }
        $data['gallery'] = $this->galleryPaths($request, []);
        $data['diagrams'] = $this->diagramRows($request, 'featured');
        FeaturedProduct::create($data);

        return redirect()->route('admin.featured-products.index')->with('ok', 'Featured product created.');
    }

    public function edit(FeaturedProduct $featuredProduct)
    {
        return view('admin.featured-products.form', ['item' => $featuredProduct, 'categories' => $this->categoryOptions()]);
    }

    public function update(Request $request, FeaturedProduct $featuredProduct)
    {
        $data = $this->validated($request);
        if ($path = $this->storeUpload($request, 'image', 'featured')) {
            $data['image'] = $path;
        }
        if ($path = $this->storeUpload($request, 'diagram_image', 'featured')) {
            $data['diagram_image'] = $path;
        }
        $data['gallery'] = $this->galleryPaths($request, $featuredProduct->gallery ?? []);
        $data['diagrams'] = $this->diagramRows($request, 'featured');
        $featuredProduct->update($data);

        return redirect()->route('admin.featured-products.index')->with('ok', 'Featured product updated.');
    }

    public function destroy(FeaturedProduct $featuredProduct)
    {
        $featuredProduct->delete();

        return back()->with('ok', 'Featured product deleted.');
    }

    private function categoryOptions(): array
    {
        return ['' => 'Home — Featured Solutions'] + ProductCategory::orderBy('sort_order')->pluck('name', 'id')->all();
    }

    private function validated(Request $request): array
    {
        $request->validate([
            'name' => ['required', 'string', 'max:160'],
            'spec' => ['nullable', 'string', 'max:160'],
            'icon' => ['nullable', 'string', 'max:60'],
            'product_category_id' => ['nullable', 'exists:product_categories,id'],
            'sort_order' => ['nullable', 'integer'],
            'image' => ['nullable', 'image', 'max:12288'],
            'diagram_image' => ['nullable', 'image', 'max:12288'],
            'diagram_caption' => ['nullable', 'string', 'max:255'],
            'diagrams.*.image' => ['nullable', 'image', 'max:12288'],
            'diagrams.*.caption' => ['nullable', 'string', 'max:255'],
            'gallery.*' => ['nullable', 'image', 'max:12288'],
            'overview' => ['nullable', 'string', 'max:5000'],
            'highlights' => ['nullable', 'string', 'max:2000'],
            'tech_features' => ['nullable', 'string', 'max:8000'],
            'dimensions' => ['nullable', 'string', 'max:8000'],
            'materials' => ['nullable', 'string', 'max:8000'],
        ]);

        return [
            'name' => $request->name,
            'spec' => $request->spec,
            'icon' => $request->icon ?: 'box',
            'product_category_id' => $request->product_category_id ?: null,
            'sort_order' => (int) $request->sort_order,
            'is_active' => $request->boolean('is_active'),
            'overview' => $request->overview ?: null,
            'diagram_caption' => $request->diagram_caption ?: null,
            'highlights' => lines_to_array($request->highlights) ?: null,
            'tech_features' => $this->parsePairs($request->tech_features) ?: null,
            'dimensions' => $this->parseTable($request->dimensions),
            'materials' => $this->parseMaterials($request->materials) ?: null,
        ];
    }

    /**
     * Merge kept + newly uploaded gallery images. `gallery_current[]` carries
     * the paths of existing images the admin didn't remove; new files arrive in
     * the `gallery[]` file input.
     */
    private function galleryPaths(Request $request, array $existing): array
    {
        $kept = array_values(array_filter(
            (array) $request->input('gallery_current', []),
            fn ($p) => is_string($p) && $p !== '' && in_array($p, $existing, true)
        ));

        return array_merge($kept, $this->storeUploads($request, 'gallery', 'featured'));
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

                return [
                    'no' => $p[0] ?? '',
                    'name' => $p[1] ?? '',
                    'material' => $p[2] ?? '',
                    'standard' => $p[3] ?? '',
                ];
            })->values()->all();
    }

    /**
     * A flexible-column table: the first non-empty line is the column headers,
     * every following line is a row. Cells are separated by "|". Returns
     * ['columns' => [...], 'rows' => [[...], ...]] or null when empty.
     */
    private function parseTable(?string $text): ?array
    {
        $lines = collect(preg_split('/\r\n|\r|\n/', (string) $text))
            ->map(fn ($l) => trim($l))->filter()->values();

        if ($lines->isEmpty()) {
            return null;
        }

        $split = fn ($l) => array_map('trim', explode('|', $l));
        $columns = $split($lines->first());
        $rows = $lines->slice(1)->map($split)->values()->all();

        return ['columns' => $columns, 'rows' => $rows];
    }
}

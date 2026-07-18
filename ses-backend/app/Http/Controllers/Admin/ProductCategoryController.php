<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductCategoryController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        $items = ProductCategory::withCount(['groups', 'featured'])->orderBy('sort_order')->get();

        return view('admin.product-categories.index', compact('items'));
    }

    public function create()
    {
        return view('admin.product-categories.form', ['item' => new ProductCategory(['is_active' => true])]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request, null);
        if ($path = $this->storeUpload($request, 'hero_image', 'categories')) {
            $data['hero_image'] = $path;
        }
        ProductCategory::create($data);

        return redirect()->route('admin.product-categories.index')->with('ok', 'Category created.');
    }

    public function edit(ProductCategory $productCategory)
    {
        return view('admin.product-categories.form', ['item' => $productCategory]);
    }

    public function update(Request $request, ProductCategory $productCategory)
    {
        $data = $this->validated($request, $productCategory->id);
        if ($path = $this->storeUpload($request, 'hero_image', 'categories')) {
            $data['hero_image'] = $path;
        }
        $productCategory->update($data);

        return redirect()->route('admin.product-categories.index')->with('ok', 'Category updated.');
    }

    public function destroy(ProductCategory $productCategory)
    {
        $productCategory->delete();

        return back()->with('ok', 'Category deleted (with its groups & featured products).');
    }

    private function validated(Request $request, ?int $id): array
    {
        $request->validate([
            'name' => ['required', 'string', 'max:160'],
            'slug' => ['nullable', 'string', 'max:160'],
            'icon' => ['nullable', 'string', 'max:60'],
            'short' => ['nullable', 'string', 'max:1000'],
            'intro' => ['nullable', 'string', 'max:1000'],
            'hero_image' => ['nullable', 'image', 'max:12288'],
            'filters' => ['nullable', 'string', 'max:2000'],
            'highlights' => ['nullable', 'string', 'max:2000'],
            'card_items' => ['nullable', 'string', 'max:2000'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $highlights = lines_to_array($request->highlights);

        return [
            'name' => $request->name,
            'slug' => $this->uniqueSlug($request->slug ?: Str::slug($request->name), $id),
            'icon' => $request->icon ?: 'box',
            'short' => $request->short,
            'intro' => $request->intro,
            'filters' => lines_to_array($request->filters),
            'highlights' => $highlights ?: null,
            'card_items' => parse_item_lines($request->card_items),
            'sort_order' => (int) $request->sort_order,
            'is_active' => $request->boolean('is_active'),
        ];
    }

    /**
     * Build a non-empty, URL-safe, unique slug. Falls back to "category" when
     * the source produces nothing usable (e.g. an Arabic-only name), and
     * appends -2, -3, … to avoid collisions with other categories.
     */
    private function uniqueSlug(?string $base, ?int $ignoreId): string
    {
        $base = trim((string) $base) ?: 'category';
        $slug = $base;
        $i = 2;

        while (ProductCategory::where('slug', $slug)
            ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
            ->exists()) {
            $slug = $base.'-'.$i++;
        }

        return $slug;
    }
}

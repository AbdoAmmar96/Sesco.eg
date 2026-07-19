<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use App\Models\ProductGroup;
use Illuminate\Http\Request;

class ProductGroupController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        $items = ProductGroup::with('category')
            ->orderBy('product_category_id')->orderBy('sort_order')->get();

        return view('admin.product-groups.index', compact('items'));
    }

    public function create()
    {
        return view('admin.product-groups.form', ['item' => new ProductGroup(['is_active' => true]), 'categories' => $this->categoryOptions()]);
    }

    public function store(Request $request)
    {
        ProductGroup::create($this->validated($request));

        return redirect()->route('admin.product-groups.index')->with('ok', 'Product group created.');
    }

    public function edit(ProductGroup $productGroup)
    {
        return view('admin.product-groups.form', ['item' => $productGroup, 'categories' => $this->categoryOptions()]);
    }

    public function update(Request $request, ProductGroup $productGroup)
    {
        $productGroup->update($this->validated($request));

        return redirect()->route('admin.product-groups.index')->with('ok', 'Product group updated.');
    }

    public function destroy(ProductGroup $productGroup)
    {
        $productGroup->delete();

        return back()->with('ok', 'Product group deleted.');
    }

    private function categoryOptions(): array
    {
        return ProductCategory::orderBy('sort_order')->pluck('name', 'id')->all();
    }

    private function validated(Request $request): array
    {
        $request->validate([
            'product_category_id' => ['required', 'exists:product_categories,id'],
            'title' => ['required', 'string', 'max:160'],
            'description' => ['nullable', 'string', 'max:1000'],
            'cta' => ['nullable', 'string', 'max:120'],
            'n' => ['nullable', 'integer'],
            'sort_order' => ['nullable', 'integer'],
            'items' => ['nullable', 'array', 'max:200'],
            'items.*.name' => ['nullable', 'string', 'max:160'],
            'items.*.icon' => ['nullable', 'string', 'max:60'],
            'items.*.image' => ['nullable', 'image', 'max:12288'],
        ]);

        return [
            'product_category_id' => $request->product_category_id,
            'n' => (int) ($request->n ?: 1),
            'title' => $request->title,
            'description' => $request->description,
            'cta' => $request->cta,
            'items' => $this->itemRows($request),
            'sort_order' => (int) $request->sort_order,
            'is_active' => $request->boolean('is_active'),
        ];
    }

    /**
     * Build the items JSON from the repeater rows. A row keeps its existing
     * image unless a new file is uploaded for it; rows left unnamed are
     * dropped, which is how the form deletes an item.
     *
     * The hidden `payload` field carries the item's full datasheet (overview,
     * techFeatures, dimensions, materials, diagrams…) so those sections — edited
     * on the dedicated Products screen — are never wiped by a group save.
     */
    private function itemRows(Request $request): array
    {
        $rows = [];

        foreach ((array) $request->input('items', []) as $i => $row) {
            $name = trim((string) ($row['name'] ?? ''));
            if ($name === '') {
                continue;
            }

            $base = json_decode((string) ($row['payload'] ?? ''), true);
            $base = is_array($base) ? $base : [];

            $base['name'] = $name;
            $base['icon'] = trim((string) ($row['icon'] ?? '')) ?: 'box';
            $base['image'] = $this->storeUpload($request, "items.{$i}.image", 'groups')
                ?: (trim((string) ($row['image_current'] ?? '')) ?: null);

            $rows[] = $base;
        }

        return $rows;
    }
}

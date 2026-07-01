<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use App\Models\ProductGroup;
use Illuminate\Http\Request;

class ProductGroupController extends Controller
{
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
            'items' => ['nullable', 'string', 'max:4000'],
        ]);

        return [
            'product_category_id' => $request->product_category_id,
            'n' => (int) ($request->n ?: 1),
            'title' => $request->title,
            'description' => $request->description,
            'cta' => $request->cta,
            'items' => parse_item_lines($request->items),
            'sort_order' => (int) $request->sort_order,
            'is_active' => $request->boolean('is_active'),
        ];
    }
}

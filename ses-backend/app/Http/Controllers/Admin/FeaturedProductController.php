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
            'image' => ['nullable', 'image', 'max:4096'],
        ]);

        return [
            'name' => $request->name,
            'spec' => $request->spec,
            'icon' => $request->icon ?: 'box',
            'product_category_id' => $request->product_category_id ?: null,
            'sort_order' => (int) $request->sort_order,
            'is_active' => $request->boolean('is_active'),
        ];
    }
}

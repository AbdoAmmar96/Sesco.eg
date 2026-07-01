<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        $items = Brand::orderBy('sort_order')->get();

        return view('admin.brands.index', compact('items'));
    }

    public function create()
    {
        return view('admin.brands.form', ['item' => new Brand(['is_active' => true])]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        if ($path = $this->storeUpload($request, 'logo', 'brands')) {
            $data['logo'] = $path;
        }
        Brand::create($data);

        return redirect()->route('admin.brands.index')->with('ok', 'Brand created.');
    }

    public function edit(Brand $brand)
    {
        return view('admin.brands.form', ['item' => $brand]);
    }

    public function update(Request $request, Brand $brand)
    {
        $data = $this->validated($request);
        if ($path = $this->storeUpload($request, 'logo', 'brands')) {
            $data['logo'] = $path;
        }
        $brand->update($data);

        return redirect()->route('admin.brands.index')->with('ok', 'Brand updated.');
    }

    public function destroy(Brand $brand)
    {
        $brand->delete();

        return back()->with('ok', 'Brand deleted.');
    }

    private function validated(Request $request): array
    {
        $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'sort_order' => ['nullable', 'integer'],
            'logo' => ['nullable', 'image', 'max:2048'],
        ]);

        return [
            'name' => $request->name,
            'sort_order' => (int) $request->sort_order,
            'is_active' => $request->boolean('is_active'),
        ];
    }
}

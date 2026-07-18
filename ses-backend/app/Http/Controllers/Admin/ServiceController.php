<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        $items = Service::orderBy('sort_order')->get();

        return view('admin.services.index', compact('items'));
    }

    public function create()
    {
        return view('admin.services.form', ['item' => new Service(['is_active' => true])]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        if ($path = $this->storeUpload($request, 'image', 'services')) {
            $data['image'] = $path;
        }
        Service::create($data);

        return redirect()->route('admin.services.index')->with('ok', 'Service created.');
    }

    public function edit(Service $service)
    {
        return view('admin.services.form', ['item' => $service]);
    }

    public function update(Request $request, Service $service)
    {
        $data = $this->validated($request);
        if ($path = $this->storeUpload($request, 'image', 'services')) {
            $data['image'] = $path;
        }
        $service->update($data);

        return redirect()->route('admin.services.index')->with('ok', 'Service updated.');
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return back()->with('ok', 'Service deleted.');
    }

    private function validated(Request $request): array
    {
        $request->validate([
            'name' => ['required', 'string', 'max:160'],
            'icon' => ['nullable', 'string', 'max:60'],
            'image' => ['nullable', 'image', 'max:12288'],
            'description' => ['nullable', 'string', 'max:1000'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        return [
            'name' => $request->name,
            'slug' => $request->slug ?: Str::slug($request->name),
            'icon' => $request->icon ?: 'wrench',
            'description' => $request->description,
            'sort_order' => (int) $request->sort_order,
            'is_active' => $request->boolean('is_active'),
        ];
    }
}

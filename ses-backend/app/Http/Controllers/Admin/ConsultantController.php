<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\Consultant;
use Illuminate\Http\Request;

class ConsultantController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        $items = Consultant::orderBy('sort_order')->get();

        return view('admin.consultants.index', compact('items'));
    }

    public function create()
    {
        return view('admin.consultants.form', ['item' => new Consultant(['is_active' => true])]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        if ($path = $this->storeUpload($request, 'logo', 'consultants')) {
            $data['logo'] = $path;
        }
        Consultant::create($data);

        return redirect()->route('admin.consultants.index')->with('ok', 'Consultant created.');
    }

    public function edit(Consultant $consultant)
    {
        return view('admin.consultants.form', ['item' => $consultant]);
    }

    public function update(Request $request, Consultant $consultant)
    {
        $data = $this->validated($request);
        if ($path = $this->storeUpload($request, 'logo', 'consultants')) {
            $data['logo'] = $path;
        }
        $consultant->update($data);

        return redirect()->route('admin.consultants.index')->with('ok', 'Consultant updated.');
    }

    public function destroy(Consultant $consultant)
    {
        $consultant->delete();

        return back()->with('ok', 'Consultant deleted.');
    }

    private function validated(Request $request): array
    {
        $request->validate([
            'name' => ['required', 'string', 'max:160'],
            'sort_order' => ['nullable', 'integer'],
            'logo' => ['nullable', 'image', 'max:8192'],
        ]);

        return [
            'name' => $request->name,
            'sort_order' => (int) $request->sort_order,
            'is_active' => $request->boolean('is_active'),
        ];
    }
}

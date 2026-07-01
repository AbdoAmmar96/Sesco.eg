<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\Download;
use Illuminate\Http\Request;

class DownloadController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        $items = Download::orderBy('sort_order')->get();

        return view('admin.downloads.index', compact('items'));
    }

    public function create()
    {
        return view('admin.downloads.form', ['item' => new Download(['is_active' => true, 'type' => 'PDF'])]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        if ($path = $this->storeUpload($request, 'file', 'downloads')) {
            $data['file_path'] = $path;
        }
        Download::create($data);

        return redirect()->route('admin.downloads.index')->with('ok', 'Download created.');
    }

    public function edit(Download $download)
    {
        return view('admin.downloads.form', ['item' => $download]);
    }

    public function update(Request $request, Download $download)
    {
        $data = $this->validated($request);
        if ($path = $this->storeUpload($request, 'file', 'downloads')) {
            $data['file_path'] = $path;
        }
        $download->update($data);

        return redirect()->route('admin.downloads.index')->with('ok', 'Download updated.');
    }

    public function destroy(Download $download)
    {
        $download->delete();

        return back()->with('ok', 'Download deleted.');
    }

    private function validated(Request $request): array
    {
        $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'description' => ['nullable', 'string', 'max:1000'],
            'icon' => ['nullable', 'string', 'max:60'],
            'type' => ['nullable', 'string', 'max:20'],
            'sort_order' => ['nullable', 'integer'],
            'file' => ['nullable', 'file', 'mimes:pdf,doc,docx,zip', 'max:20480'],
        ]);

        return [
            'title' => $request->title,
            'description' => $request->description,
            'icon' => $request->icon ?: 'file-text',
            'type' => $request->type ?: 'PDF',
            'sort_order' => (int) $request->sort_order,
            'is_active' => $request->boolean('is_active'),
        ];
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        $items = Project::orderBy('sort_order')->get();

        return view('admin.projects.index', compact('items'));
    }

    public function create()
    {
        return view('admin.projects.form', ['item' => new Project(['is_active' => true]), 'categories' => $this->categories()]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        if ($path = $this->storeUpload($request, 'image', 'projects')) {
            $data['image'] = $path;
        }
        Project::create($data);

        return redirect()->route('admin.projects.index')->with('ok', 'Project created.');
    }

    public function edit(Project $project)
    {
        return view('admin.projects.form', ['item' => $project, 'categories' => $this->categories()]);
    }

    public function update(Request $request, Project $project)
    {
        $data = $this->validated($request);
        if ($path = $this->storeUpload($request, 'image', 'projects')) {
            $data['image'] = $path;
        }
        $project->update($data);

        return redirect()->route('admin.projects.index')->with('ok', 'Project updated.');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return back()->with('ok', 'Project deleted.');
    }

    private function categories(): array
    {
        $filters = Setting::get('project_filters', ['Residential', 'Commercial', 'Industrial', 'Infrastructure']);

        return collect($filters)->reject(fn ($f) => Str::startsWith(strtolower($f), 'all'))->values()->all();
    }

    private function validated(Request $request): array
    {
        $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'category' => ['nullable', 'string', 'max:60'],
            'description' => ['nullable', 'string', 'max:2000'],
            'icon' => ['nullable', 'string', 'max:60'],
            'tags' => ['nullable', 'string', 'max:300'],
            'sort_order' => ['nullable', 'integer'],
            'image' => ['nullable', 'image', 'max:4096'],
        ]);

        $tags = collect(preg_split('/[,\n]+/', (string) $request->tags))
            ->map(fn ($t) => trim($t))->filter()->values()->all();

        return [
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'category' => $request->category,
            'tags' => $tags,
            'description' => $request->description,
            'icon' => $request->icon ?: 'building',
            'sort_order' => (int) $request->sort_order,
            'is_active' => $request->boolean('is_active'),
        ];
    }
}

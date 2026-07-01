<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContentBlock;
use Illuminate\Http\Request;

class ContentBlockController extends Controller
{
    public function index(Request $request)
    {
        $group = $request->get('group');
        $query = ContentBlock::orderBy('group')->orderBy('sort_order');
        if ($group && array_key_exists($group, ContentBlock::GROUPS)) {
            $query->where('group', $group);
        }
        $items = $query->get()->groupBy('group');

        return view('admin.content-blocks.index', ['groups' => $items, 'activeGroup' => $group]);
    }

    public function create()
    {
        return view('admin.content-blocks.form', ['item' => new ContentBlock(['is_active' => true])]);
    }

    public function store(Request $request)
    {
        ContentBlock::create($this->validated($request));

        return redirect()->route('admin.content-blocks.index')->with('ok', 'Content block created.');
    }

    public function edit(ContentBlock $contentBlock)
    {
        return view('admin.content-blocks.form', ['item' => $contentBlock]);
    }

    public function update(Request $request, ContentBlock $contentBlock)
    {
        $contentBlock->update($this->validated($request));

        return redirect()->route('admin.content-blocks.index')->with('ok', 'Content block updated.');
    }

    public function destroy(ContentBlock $contentBlock)
    {
        $contentBlock->delete();

        return back()->with('ok', 'Content block deleted.');
    }

    private function validated(Request $request): array
    {
        $request->validate([
            'group' => ['required', 'in:'.implode(',', array_keys(ContentBlock::GROUPS))],
            'title' => ['nullable', 'string', 'max:160'],
            'subtitle' => ['nullable', 'string', 'max:600'],
            'icon' => ['nullable', 'string', 'max:60'],
            'value' => ['nullable', 'string', 'max:60'],
            'label' => ['nullable', 'string', 'max:160'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        return [
            'group' => $request->group,
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'icon' => $request->icon,
            'value' => $request->value,
            'label' => $request->label,
            'sort_order' => (int) $request->sort_order,
            'is_active' => $request->boolean('is_active'),
        ];
    }
}

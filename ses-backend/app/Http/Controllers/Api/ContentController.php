<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Consultant;
use App\Models\ContentBlock;
use App\Models\Download;
use App\Models\FeaturedProduct;
use App\Models\ProductCategory;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use Illuminate\Support\Str;

class ContentController extends Controller
{
    /**
     * Returns the entire site content tree, shaped to match the frontend's
     * legacy `siteData.js` exports so the React app can consume it directly.
     */
    public function index()
    {
        $blocks = ContentBlock::where('is_active', true)->orderBy('sort_order')->get()->groupBy('group');

        return response()->json([
            'company' => Setting::get('company', []),
            'pages' => Setting::get('pages', []),
            'projectFilters' => Setting::get('project_filters', ['All Projects']),

            'productCategories' => ProductCategory::where('is_active', true)->orderBy('sort_order')->get()->map(fn ($c) => [
                'slug' => $c->slug,
                'name' => $c->name,
                'icon' => $c->icon,
                'short' => $c->short,
                'intro' => $c->intro,
                'heroImage' => $this->media($c->hero_image),
                'items' => $c->card_items ?? [],
            ]),

            'services' => Service::where('is_active', true)->orderBy('sort_order')->get()->map(fn ($s) => [
                'slug' => $s->slug,
                'name' => $s->name,
                'icon' => $s->icon,
                'desc' => $s->description,
            ]),

            'homeServices' => $this->blocks($blocks, 'home_services', fn ($b) => [
                'name' => $b->title, 'icon' => $b->icon, 'desc' => $b->subtitle,
            ]),
            'aboutStats' => $this->blocks($blocks, 'about_stats', fn ($b) => [
                'value' => $b->value, 'label' => $b->label, 'icon' => $b->icon,
            ]),
            'projectStats' => $this->blocks($blocks, 'project_stats', fn ($b) => [
                'value' => $b->value, 'label' => $b->label, 'icon' => $b->icon,
            ]),
            'whatWeDo' => $this->blocks($blocks, 'what_we_do', fn ($b) => [
                'name' => $b->title, 'icon' => $b->icon, 'desc' => $b->subtitle,
            ]),
            'missionVisionValues' => $this->blocks($blocks, 'mvv', fn ($b) => [
                'title' => $b->title, 'icon' => $b->icon, 'desc' => $b->subtitle,
            ]),
            'capabilities' => $this->blocks($blocks, 'capabilities', fn ($b) => [
                'name' => $b->title, 'icon' => $b->icon,
            ]),
            'whyChoose' => $this->blocks($blocks, 'why_choose', fn ($b) => [
                'title' => $b->title, 'icon' => $b->icon, 'desc' => $b->subtitle,
            ]),
            'certifications' => $this->blocks($blocks, 'certifications', fn ($b) => [
                'code' => $b->title, 'standard' => $b->value, 'label' => $b->label,
            ]),

            'brands' => Brand::where('is_active', true)->orderBy('sort_order')->get()->map(fn ($b) => [
                'name' => $b->name, 'logo' => $this->media($b->logo),
            ]),
            'consultants' => Consultant::where('is_active', true)->orderBy('sort_order')->get()->map(fn ($c) => [
                'name' => $c->name, 'logo' => $this->media($c->logo),
            ]),

            'featuredSolutions' => FeaturedProduct::whereNull('product_category_id')
                ->where('is_active', true)->orderBy('sort_order')->get()
                ->map(fn ($f) => [
                    'name' => $f->name, 'icon' => $f->icon, 'image' => $this->media($f->image),
                ]),

            'fireFighting' => $this->categoryDetail('fire-fighting'),
            'fireAlarm' => $this->categoryDetail('fire-alarm'),
            'waterNetwork' => $this->categoryDetail('water-network'),

            // Detail (filters/highlights/groups/featured) for EVERY active
            // category, keyed by slug — lets the frontend render a detail page
            // for any CMS-created category, not just the three seeded ones.
            'categoryDetails' => ProductCategory::where('is_active', true)
                ->orderBy('sort_order')->get()
                ->mapWithKeys(fn ($c) => [$c->slug => $this->categoryDetail($c->slug)]),

            'projects' => Project::where('is_active', true)->orderBy('sort_order')->get()->map(fn ($p) => [
                'title' => $p->title,
                'slug' => $p->slug,
                'category' => $p->category,
                'tags' => $p->tags ?? [],
                'desc' => $p->description,
                'icon' => $p->icon,
                'image' => $this->media($p->image),
            ]),

            'downloads' => Download::where('is_active', true)->orderBy('sort_order')->get()->map(fn ($d) => [
                'title' => $d->title,
                'desc' => $d->description,
                'icon' => $d->icon,
                'type' => $d->type,
                'file' => $this->media($d->file_path),
            ]),
        ]);
    }

    private function categoryDetail(string $slug): ?array
    {
        $cat = ProductCategory::with(['groups' => fn ($q) => $q->where('is_active', true),
            'featured' => fn ($q) => $q->where('is_active', true)])
            ->where('slug', $slug)->first();

        if (! $cat) {
            return null;
        }

        return [
            'filters' => ! empty($cat->filters) ? $cat->filters : ['All Products'],
            'highlights' => $cat->highlights,
            'groups' => $cat->groups->map(fn ($g) => [
                'n' => $g->n,
                'title' => $g->title,
                'desc' => $g->description,
                'cta' => $g->cta,
                'items' => collect($g->items ?? [])->map(fn ($it) => [
                    'name' => $it['name'] ?? '',
                    'icon' => $it['icon'] ?? 'box',
                    'image' => $this->media($it['image'] ?? null),
                ])->values(),
            ]),
            'featured' => $cat->featured->map(fn ($f) => [
                'name' => $f->name,
                'spec' => $f->spec,
                'icon' => $f->icon,
                'image' => $this->media($f->image),
            ]),
        ];
    }

    private function blocks($grouped, string $group, callable $map)
    {
        return ($grouped[$group] ?? collect())->map($map)->values();
    }

    /**
     * Resolve a stored media path to a URL the frontend can load.
     * - http(s) URLs and frontend public assets (/images/...) pass through.
     * - backend-stored files (/storage/...) become absolute backend URLs.
     */
    private function media(?string $path): ?string
    {
        if (! $path) {
            return null;
        }
        if (Str::startsWith($path, ['http://', 'https://', '/images/'])) {
            return $path;
        }

        return rtrim(config('app.url'), '/').'/'.ltrim($path, '/');
    }
}

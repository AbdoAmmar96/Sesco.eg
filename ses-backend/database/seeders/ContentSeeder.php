<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Consultant;
use App\Models\ContentBlock;
use App\Models\Download;
use App\Models\FeaturedProduct;
use App\Models\ProductCategory;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('data/site-content.json');
        if (! file_exists($path)) {
            $this->command->error('site-content.json not found. Run database/data/export-content.mjs first.');
            return;
        }
        $d = json_decode(file_get_contents($path), true);

        // Make the seeder re-runnable.
        Schema::disableForeignKeyConstraints();
        foreach ([ContentBlock::class, Download::class, Service::class, Consultant::class,
            Brand::class, Project::class, FeaturedProduct::class, \App\Models\ProductGroup::class,
            ProductCategory::class, Setting::class] as $model) {
            $model::truncate();
        }
        Schema::enableForeignKeyConstraints();

        // ---- Settings ----
        Setting::put('company', $d['company']);
        Setting::put('project_filters', $d['projectFilters']);
        Setting::put('pages', [
            'home' => [
                'title' => 'Integrated Fire Fighting, Fire Alarm & Water Network Solutions',
                'subtitle' => 'SES Trading & Industries delivers end-to-end engineered solutions in Fire Protection, Fire Alarm and Water Networks. Built for safety. Designed for reliability.',
            ],
            'about' => [
                'title' => 'About SES Trading & Industries',
                'subtitle' => 'Integrated engineering solutions for Fire Fighting, Fire Alarm, MEP, Water Networks, Testing, Commissioning and Maintenance across Egypt.',
            ],
            'products' => [
                'title' => 'Products & Engineering Solutions',
                'subtitle' => 'Explore SES product categories for Fire Fighting Systems, Fire Alarm Systems, and Water Network Products, with organized subcategories, product photos, and easy access to quotations and catalogs.',
            ],
            'projects' => [
                'title' => 'Our Projects',
                'subtitle' => 'Delivering Integrated Fire Fighting, Fire Alarm, MEP & Water Network Solutions with excellence across Egypt.',
            ],
            'services' => [
                'title' => 'Our Services',
                'subtitle' => 'End-to-end solutions backed by engineering expertise, quality workmanship and a commitment to safety.',
            ],
            'downloads' => [
                'title' => 'Download Center',
                'subtitle' => 'Easy access to company, product and service documents — profiles, catalogs, datasheets and compliance certificates.',
            ],
            'contact' => [
                'title' => 'Contact Us',
                'subtitle' => 'Get in touch with SES Trading & Industries for quotations, product inquiries, technical support, and project discussions.',
            ],
        ]);

        // ---- Product categories (+ groups + featured) ----
        $catData = [
            'fire-fighting' => $d['fireFighting'],
            'fire-alarm' => $d['fireAlarm'],
            'water-network' => $d['waterNetwork'],
        ];
        foreach ($d['productCategories'] as $i => $pc) {
            $cd = $catData[$pc['slug']] ?? [];
            $cat = ProductCategory::create([
                'slug' => $pc['slug'],
                'name' => $pc['name'],
                'icon' => $pc['icon'],
                'short' => $pc['short'] ?? null,
                'intro' => $pc['intro'] ?? null,
                'hero_image' => "/images/hero-{$pc['slug']}.jpg",
                'filters' => $cd['filters'] ?? null,
                'highlights' => $cd['highlights'] ?? null,
                'card_items' => $pc['items'] ?? [],
                'sort_order' => $i,
            ]);
            foreach (($cd['groups'] ?? []) as $gi => $g) {
                $cat->groups()->create([
                    'n' => $g['n'] ?? ($gi + 1),
                    'title' => $g['title'],
                    'description' => $g['desc'] ?? null,
                    'cta' => $g['cta'] ?? null,
                    'items' => $g['items'] ?? [],
                    'sort_order' => $gi,
                ]);
            }
            foreach (($cd['featured'] ?? []) as $fi => $f) {
                $cat->featured()->create([
                    'name' => $f['name'],
                    'spec' => $f['spec'] ?? null,
                    'icon' => $f['icon'] ?? 'box',
                    'sort_order' => $fi,
                ]);
            }
        }

        // ---- Home "Featured Solutions" (no category) ----
        foreach ($d['featuredSolutions'] as $i => $f) {
            FeaturedProduct::create([
                'product_category_id' => null,
                'name' => $f['name'],
                'icon' => $f['icon'] ?? 'box',
                'sort_order' => $i,
            ]);
        }

        // ---- Projects ----
        foreach ($d['projects'] as $i => $p) {
            $slug = Str::slug($p['title']);
            Project::create([
                'title' => $p['title'],
                'slug' => $slug,
                'category' => $p['category'] ?? null,
                'tags' => $p['tags'] ?? [],
                'description' => $p['desc'] ?? null,
                'icon' => $p['icon'] ?? 'building',
                'image' => "/images/project-{$slug}.jpg",
                'sort_order' => $i,
            ]);
        }

        // ---- Brands / Consultants (logo slug -> path) ----
        foreach ($d['brands'] as $i => $b) {
            Brand::create([
                'name' => $b['name'],
                'logo' => isset($b['logo']) ? "/images/brands/{$b['logo']}.png" : null,
                'sort_order' => $i,
            ]);
        }
        foreach ($d['consultants'] as $i => $c) {
            Consultant::create([
                'name' => $c['name'],
                'logo' => isset($c['logo']) ? "/images/consultants/{$c['logo']}.png" : null,
                'sort_order' => $i,
            ]);
        }

        // ---- Services ----
        foreach ($d['services'] as $i => $s) {
            Service::create([
                'slug' => $s['slug'] ?? Str::slug($s['name']),
                'name' => $s['name'],
                'icon' => $s['icon'] ?? 'wrench',
                'description' => $s['desc'] ?? null,
                'sort_order' => $i,
            ]);
        }

        // ---- Downloads ----
        foreach ($d['downloads'] as $i => $dl) {
            Download::create([
                'title' => $dl['title'],
                'description' => $dl['desc'] ?? null,
                'icon' => $dl['icon'] ?? 'file-text',
                'type' => $dl['type'] ?? 'PDF',
                'sort_order' => $i,
            ]);
        }

        // ---- Content blocks ----
        $this->blocks('home_services', $d['homeServices'], fn ($x) => ['title' => $x['name'], 'subtitle' => $x['desc'] ?? null, 'icon' => $x['icon'] ?? null]);
        $this->blocks('about_stats', $d['aboutStats'], fn ($x) => ['value' => $x['value'], 'label' => $x['label'], 'icon' => $x['icon'] ?? null]);
        $this->blocks('project_stats', $d['projectStats'], fn ($x) => ['value' => $x['value'], 'label' => $x['label'], 'icon' => $x['icon'] ?? null]);
        $this->blocks('what_we_do', $d['whatWeDo'], fn ($x) => ['title' => $x['name'], 'subtitle' => $x['desc'] ?? null, 'icon' => $x['icon'] ?? null]);
        $this->blocks('mvv', $d['missionVisionValues'], fn ($x) => ['title' => $x['title'], 'subtitle' => $x['desc'] ?? null, 'icon' => $x['icon'] ?? null]);
        $this->blocks('capabilities', $d['capabilities'], fn ($x) => ['title' => $x['name'], 'icon' => $x['icon'] ?? null]);
        $this->blocks('why_choose', $d['whyChoose'], fn ($x) => ['title' => $x['title'], 'subtitle' => $x['desc'] ?? null, 'icon' => $x['icon'] ?? null]);
        $this->blocks('certifications', $d['certifications'], fn ($x) => ['title' => $x['code'], 'value' => $x['standard'], 'label' => $x['label'] ?? null]);
    }

    private function blocks(string $group, array $items, callable $map): void
    {
        foreach ($items as $i => $item) {
            ContentBlock::create(array_merge(
                ['group' => $group, 'sort_order' => $i],
                $map($item)
            ));
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\FeaturedProduct;
use App\Models\ProductCategory;
use App\Models\ProductGroup;
use Illuminate\Database\Seeder;

/**
 * Rebuilds the product groups & featured products for the three product
 * categories from `database/data/website-products.json` (extracted from the
 * client's "Website Products.xlsx"). Replaces the existing groups/featured for
 * each category listed in the JSON; other content is left untouched.
 */
class WebsiteProductsSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('data/website-products.json');
        if (! file_exists($path)) {
            $this->command->error("Missing data file: {$path}");

            return;
        }

        $data = json_decode(file_get_contents($path), true);

        foreach ($data as $slug => $payload) {
            $category = ProductCategory::where('slug', $slug)->first();
            if (! $category) {
                $this->command->warn("Category '{$slug}' not found — skipped.");
                continue;
            }

            // Replace this category's groups & featured products.
            $category->groups()->delete();
            $category->featured()->delete();

            if (! empty($payload['filters'])) {
                $category->update(['filters' => $payload['filters']]);
            }

            foreach ($payload['groups'] as $i => $g) {
                ProductGroup::create([
                    'product_category_id' => $category->id,
                    'n' => $g['n'] ?? $i + 1,
                    'title' => $g['title'],
                    'description' => $g['desc'] ?? '',
                    'cta' => $g['cta'] ?? 'Request a Quotation',
                    'items' => $g['items'] ?? [],
                    'sort_order' => $i,
                    'is_active' => true,
                ]);
            }

            foreach ($payload['featured'] as $i => $f) {
                FeaturedProduct::create([
                    'product_category_id' => $category->id,
                    'name' => $f['name'],
                    'spec' => $f['spec'] ?? null,
                    'icon' => $f['icon'] ?? 'box',
                    'image' => $f['image'] ?? null,
                    'sort_order' => $i,
                    'is_active' => true,
                    // Optional datasheet fields (rendered only when present).
                    'overview' => $f['overview'] ?? null,
                    'highlights' => $f['highlights'] ?? null,
                    'gallery' => $f['gallery'] ?? null,
                    'diagram_image' => $f['diagramImage'] ?? null,
                    'diagram_caption' => $f['diagramCaption'] ?? null,
                    'diagrams' => $f['diagrams'] ?? null,
                    'tech_features' => $f['techFeatures'] ?? null,
                    'dimensions' => $f['dimensions'] ?? null,
                    'materials' => $f['materials'] ?? null,
                ]);
            }

            $this->command->info(sprintf(
                '%s: %d groups, %d featured.',
                $slug,
                count($payload['groups']),
                count($payload['featured'])
            ));
        }
    }
}

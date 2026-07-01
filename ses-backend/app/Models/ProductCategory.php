<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductCategory extends Model
{
    protected $fillable = [
        'slug', 'name', 'icon', 'short', 'intro', 'hero_image',
        'filters', 'highlights', 'card_items', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'filters' => 'array',
        'highlights' => 'array',
        'card_items' => 'array',
        'is_active' => 'boolean',
    ];

    public function groups(): HasMany
    {
        return $this->hasMany(ProductGroup::class)->orderBy('sort_order');
    }

    public function featured(): HasMany
    {
        return $this->hasMany(FeaturedProduct::class)->orderBy('sort_order');
    }
}

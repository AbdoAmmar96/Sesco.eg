<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FeaturedProduct extends Model
{
    protected $fillable = [
        'product_category_id', 'name', 'spec', 'icon', 'image', 'sort_order', 'is_active',
        'overview', 'highlights', 'gallery', 'diagram_image', 'diagram_caption',
        'tech_features', 'dimensions', 'materials',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'highlights' => 'array',
        'gallery' => 'array',
        'tech_features' => 'array',
        'dimensions' => 'array',
        'materials' => 'array',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id');
    }
}

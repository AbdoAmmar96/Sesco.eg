<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContentBlock extends Model
{
    protected $fillable = [
        'group', 'title', 'subtitle', 'icon', 'value', 'label', 'extra', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'extra' => 'array',
        'is_active' => 'boolean',
    ];

    // Human labels for the known groups (used by the admin UI).
    public const GROUPS = [
        'home_services' => 'Home Services Strip',
        'about_stats' => 'About — Stats',
        'project_stats' => 'Projects — Stats',
        'what_we_do' => 'About — What We Do',
        'mvv' => 'About — Mission / Vision / Values',
        'capabilities' => 'About — Capabilities',
        'why_choose' => 'About — Why Choose SES',
        'certifications' => 'Certifications',
    ];
}

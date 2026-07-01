<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Consultant;
use App\Models\Download;
use App\Models\FeaturedProduct;
use App\Models\Lead;
use App\Models\ProductCategory;
use App\Models\Project;
use App\Models\Service;

class DashboardController extends Controller
{
    public function index()
    {
        $cards = [
            ['label' => 'New Leads', 'value' => Lead::where('status', 'new')->count(), 'route' => 'admin.leads.index', 'accent' => 'orange'],
            ['label' => 'Total Leads', 'value' => Lead::count(), 'route' => 'admin.leads.index', 'accent' => 'navy'],
            ['label' => 'Projects', 'value' => Project::count(), 'route' => 'admin.projects.index', 'accent' => 'royal'],
            ['label' => 'Product Categories', 'value' => ProductCategory::count(), 'route' => 'admin.product-categories.index', 'accent' => 'navy'],
            ['label' => 'Featured Products', 'value' => FeaturedProduct::count(), 'route' => 'admin.featured-products.index', 'accent' => 'royal'],
            ['label' => 'Services', 'value' => Service::count(), 'route' => 'admin.services.index', 'accent' => 'navy'],
            ['label' => 'Brands', 'value' => Brand::count(), 'route' => 'admin.brands.index', 'accent' => 'royal'],
            ['label' => 'Consultants', 'value' => Consultant::count(), 'route' => 'admin.consultants.index', 'accent' => 'navy'],
            ['label' => 'Downloads', 'value' => Download::count(), 'route' => 'admin.downloads.index', 'accent' => 'royal'],
        ];

        $recentLeads = Lead::latest()->take(6)->get();

        return view('admin.dashboard', compact('cards', 'recentLeads'));
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Rich datasheet fields for a featured product's detail page, modelled on a
     * manufacturer product sheet: overview + highlight callouts, an image
     * gallery, a cross-section diagram, a key/value technical-features table, a
     * flexible-column dimensions table, and a materials & standards list. All
     * nullable — a product renders only the sections it has data for.
     */
    public function up(): void
    {
        Schema::table('featured_products', function (Blueprint $table) {
            $table->text('overview')->nullable()->after('spec');
            $table->json('highlights')->nullable()->after('overview');
            $table->json('gallery')->nullable()->after('image');
            $table->string('diagram_image')->nullable()->after('gallery');
            $table->string('diagram_caption')->nullable()->after('diagram_image');
            $table->json('tech_features')->nullable()->after('diagram_caption');
            $table->json('dimensions')->nullable()->after('tech_features');
            $table->json('materials')->nullable()->after('dimensions');
        });
    }

    public function down(): void
    {
        Schema::table('featured_products', function (Blueprint $table) {
            $table->dropColumn([
                'overview', 'highlights', 'gallery', 'diagram_image',
                'diagram_caption', 'tech_features', 'dimensions', 'materials',
            ]);
        });
    }
};

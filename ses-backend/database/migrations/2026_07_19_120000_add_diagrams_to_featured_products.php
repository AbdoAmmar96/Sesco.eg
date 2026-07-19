<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * A list of labelled technical drawings for a product's detail page —
     * each entry is {image, caption} (e.g. a structure/cross-section diagram
     * and a dimensions drawing). Complements the single `diagram_image` and
     * the `dimensions` table. Nullable: rendered only when present.
     */
    public function up(): void
    {
        Schema::table('featured_products', function (Blueprint $table) {
            $table->json('diagrams')->nullable()->after('diagram_caption');
        });
    }

    public function down(): void
    {
        Schema::table('featured_products', function (Blueprint $table) {
            $table->dropColumn('diagrams');
        });
    }
};

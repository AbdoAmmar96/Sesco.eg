<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Lets a service carry a CMS-uploaded image. Services with no image keep
     * falling back to the bundled /images/service-{slug}.jpg convention.
     */
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->string('image')->nullable()->after('icon');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('image');
        });
    }
};

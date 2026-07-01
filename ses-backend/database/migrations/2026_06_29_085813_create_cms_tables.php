<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Key/value settings (company info, page hero texts, project filters…)
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->json('value')->nullable();
            $table->timestamps();
        });

        Schema::create('product_categories', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('icon')->default('box');
            $table->text('short')->nullable();
            $table->text('intro')->nullable();
            $table->string('hero_image')->nullable();
            $table->json('filters')->nullable();
            $table->json('highlights')->nullable();
            $table->json('card_items')->nullable();   // [{name, icon}] shown on the card
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('product_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_category_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('n')->default(1);
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('cta')->nullable();
            $table->json('items')->nullable();        // [{name, icon}]
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('featured_products', function (Blueprint $table) {
            $table->id();
            // null category = Home "Featured Solutions"
            $table->foreignId('product_category_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('spec')->nullable();
            $table->string('icon')->default('box');
            $table->string('image')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->nullable();
            $table->string('category')->nullable();
            $table->json('tags')->nullable();
            $table->text('description')->nullable();
            $table->string('icon')->default('building');
            $table->string('image')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('brands', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('logo')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('consultants', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('logo')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->nullable();
            $table->string('name');
            $table->string('icon')->default('wrench');
            $table->text('description')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('downloads', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('icon')->default('file-text');
            $table->string('type')->default('PDF');
            $table->string('file_path')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Generic repeatable content (home services, stats, what-we-do, MVV,
        // capabilities, why-choose, certifications…) grouped by `group`.
        Schema::create('content_blocks', function (Blueprint $table) {
            $table->id();
            $table->string('group')->index();
            $table->string('title')->nullable();
            $table->text('subtitle')->nullable();
            $table->string('icon')->nullable();
            $table->string('value')->nullable();   // stats number, e.g. "10+"
            $table->string('label')->nullable();   // stats label / cert standard
            $table->json('extra')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_blocks');
        Schema::dropIfExists('downloads');
        Schema::dropIfExists('services');
        Schema::dropIfExists('consultants');
        Schema::dropIfExists('brands');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('featured_products');
        Schema::dropIfExists('product_groups');
        Schema::dropIfExists('product_categories');
        Schema::dropIfExists('settings');
    }
};

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Download extends Model
{
    protected $fillable = ['title', 'description', 'icon', 'type', 'file_path', 'sort_order', 'is_active'];

    protected $casts = ['is_active' => 'boolean'];
}

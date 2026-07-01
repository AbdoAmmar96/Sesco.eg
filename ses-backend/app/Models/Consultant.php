<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultant extends Model
{
    protected $fillable = ['name', 'logo', 'sort_order', 'is_active'];

    protected $casts = ['is_active' => 'boolean'];
}

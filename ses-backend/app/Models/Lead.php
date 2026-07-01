<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'type', 'name', 'company', 'email', 'phone',
        'subject', 'interested_in', 'message', 'status', 'ip_address',
    ];

    public const STATUSES = ['new', 'read', 'replied', 'archived'];

    public function getTypeLabelAttribute(): string
    {
        return $this->type === 'quote' ? 'Quotation' : 'Contact';
    }
}

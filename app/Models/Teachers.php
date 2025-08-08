<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teachers extends Model
{
    protected $fillable = [
        'admin_id',
        'name',
        'email',
        'password',
        'role', // Added role field
        'status',
        'batch_ids',
        'subject_ids',
    ];

    protected $casts = [
        'batch_ids' => 'array',
        'subject_ids' => 'array',
    ];
}

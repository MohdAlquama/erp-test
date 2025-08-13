<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminCard extends Model
{
      protected $fillable = [
        'admin_id',
        'admin_data',
        'batch_data',
        'students_data',
    ];

    protected $casts = [
        'admin_data' => 'array',
        'batch_data' => 'array',
        'students_data' => 'array',
    ];
}

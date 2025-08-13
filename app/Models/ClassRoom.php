<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassRoom extends Model
{
        protected $table = 'class_rooms';

    // Fillable fields for mass assignment
    protected $fillable = [
        'room_name',
        'room_type',
        'admin_id',
    ];
}

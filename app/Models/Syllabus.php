<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Syllabus extends Model
{
    
    protected $table = 'syllabus'; // add this if you keep the singular name
    protected $fillable = ['admin_id', 'batch_id', 'file_path'];

protected $casts = [
    'file_path' => 'array', // JSON automatically converted to array
];
}

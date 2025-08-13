<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendace extends Model
{
    //
      protected $fillable = [
        'student_id',
        'batch_id',
        'teacher_id',
        'admin_id',
        'date',
        'status',
    ];
}

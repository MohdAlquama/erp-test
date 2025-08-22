<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Attendance extends Model
{
       use HasFactory;

    protected $fillable = [
        'admin_id', 'teacher_id', 'subject_id', 'batch_id',
        'teacher_name', 'subject_name', 'batch_name',
        'student_name', 'student_enrollment_number',
        'status', 'date'
    ];
}

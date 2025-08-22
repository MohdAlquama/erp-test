<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class admit_card_issues extends Model
{
    
         protected $fillable = [
            'admin_id',
        'folder_id',
        'batch_id',
        'enrollment_number',
        'subject_name',
        'batch_name',
        'teacher_name',
        'student_name',
        'exam_venue',
        'exam_date',
        'exam_time',
    ];
}

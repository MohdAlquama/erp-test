<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_id',
        'folder_id',
        'batch_id',
        'admit_card_id',
        'enrollment_number',
        'subject_name',
        'student_name',    // ✅ added
        'max_marks',
        'scored_marks',
        'status',
    ];
}

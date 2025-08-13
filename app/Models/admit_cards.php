<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class admit_cards extends Model
{
    protected $fillable = [
        'admin_id',
        'college_name',
        'exam_type',
        'session_of_exam',
        'college_logo_url',
        'sign_url',
        'general_instructions',
        'notices',
    ];

    protected $casts = [
        'general_instructions' => 'array',
        'notices' => 'array',
    ];
}

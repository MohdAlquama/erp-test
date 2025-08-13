<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class batch_subject_teacher extends Model
{
    use HasFactory;

    protected $table = 'batch_subject_teacher';

    protected $fillable = [
        'batch_id',
        'teacher_id',
        'subject_id',
        'Admin_id'
    ];

    public function batch()
    {
        return $this->belongsTo(Batch::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teachers::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class admit_card_folders extends Model
{
    protected $fillable = [
        'admin_id',
        'folder_name',
        'description',
        'year',
        'exam_type_id'
    ];

     public function admin()
    {
        return $this->belongsTo(Admin::class);
    }
}

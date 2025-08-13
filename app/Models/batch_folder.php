<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class batch_folder extends Model
{

      protected $table = 'batch_folders';
    protected $fillable = ['admin_id', 'batch_id', 'folder_id'];
}

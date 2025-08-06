<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    protected $fillable = [
        'sub_admin_id',
        'token',
        'status',
        'token_limit',
        'token_used',
        'regen_count',
        'last_regen_at',
    ];

    protected $dates = ['last_regen_at'];

    public function sub_admin()
    {
        return $this->belongsTo(SubAdmin::class);
    }
}
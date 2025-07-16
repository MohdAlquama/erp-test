<?php

// namespace App\Models;

// use Illuminate\Database\Eloquent\Model;

// class SubAdmin extends Model
// {
//     protected $fillable = ['name', 'email', 'password', 'phone', 'dob', 'ip', 'address', 'role','permissions'];

//     protected $casts = [
//         'permissions' => 'array',   
//         // 'module' => 'array',
//     ];
// }


namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class SubAdmin extends Authenticatable
{
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'dob',
        'ip',
        'address',
        'status',
        'role',
        'permissions'
    ];

    protected $casts = [
        'permissions' => 'array',
    ];
}

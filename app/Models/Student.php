<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'admin_id', 
        'name',
        'email',
        'password',
        'enrollment_number',
        'contact_number',
        'status',
        'batch_ids',
        'session',
        'father_name',
        'profile_image',
          'gender',  // new
        'dob',     // new
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'batch_ids' => 'array', // Cast JSON to array
                'dob' => 'date',
     
    ];
}
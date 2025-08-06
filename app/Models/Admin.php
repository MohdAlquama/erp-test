<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'token',
        'permissions',
        'status',
        'sub_admin_id', // Added for sub-admin association
    ];

    protected $hidden = [
        'password',
        'token',
    ];

    protected $casts = [
        'permissions' => 'array', // Stored as JSON
    ];

    /**
     * Accessor to check if admin is active.
     */
    public function isActive(): bool
    {
        return $this->status === 'active';
    }
}

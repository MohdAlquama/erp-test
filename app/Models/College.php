<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class College extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'location', 'logo', 'admin_id']; // ✅ added logo

    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }
}

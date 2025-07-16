<?php

namespace App\Http\Controllers;

use App\Models\SubAdmin;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubAdminDashboardController extends Controller
{
     public function index(){
        return Inertia::render('subadmin/SubAdminDashboard');
        }
         public function getPermissions($id)
    {
        $subadmin = SubAdmin::findOrFail($id);

        // Return permissions as string, array, or JSON depending on your database structure
        return response()->json([
            'permissions' => $subadmin->permissions
        ]);
    }
}

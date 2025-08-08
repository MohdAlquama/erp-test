<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Teachers;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class HelperController extends Controller
{
  // Get all teachers and their count by admin_id
public function index($id)
{
    // All teachers of given admin
    $teachers = Teachers::where('admin_id', $id)->get();

    // Count teachers
    $total = $teachers->count();
    $active = $teachers->where('status', 'Active')->count();
    $inactive = $teachers->where('status', 'Inactive')->count();

    // Monthly registration count (last 6 months)
    $monthlyRegistrations = Teachers::select(
            DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month"),
            DB::raw("COUNT(*) as count")
        )
        ->where('admin_id', $id)
        ->groupBy('month')
        ->orderBy('month', 'desc')
        ->take(6)
        ->get()
        ->reverse() // For chronological order
        ->values();

    return response()->json([
        'teachers' => $teachers,
        'total' => $total,
        'active' => $active,
        'inactive' => $inactive,
        'monthlyRegistrations' => $monthlyRegistrations,
    ]);
}
}

<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Syllabus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentSyllbusController extends Controller
{
    public function index()
    {
        return Inertia::render('student/Syllabus');
    }
public function show($adminId, $batchId)
{
    $syllabus = Syllabus::where('admin_id', $adminId)
                         ->where('batch_id', $batchId)
                         ->get();

    if (!$syllabus) {
        return response()->json(['message' => 'Syllabus not found'], 404);
    }

    return response()->json(['syllabus' => $syllabus]);
}

}

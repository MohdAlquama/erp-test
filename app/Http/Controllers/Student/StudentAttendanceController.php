<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class StudentAttendanceController extends Controller
{
  
     public function index()
    {
        return Inertia::render('student/Attendance');
    }

    public function getAttendance($student_EndrollmentNumber, $adminId)
    {
        // Logic to fetch attendance data
$studentAttendance = DB::table('students as s')
    ->join('batches as b', function ($join) {
        $join->on('b.id', '=', 's.batch_ids')
             ->on('b.created_by', '=', 's.admin_id');
    })
    ->join('attendances as a', function ($join) {
        $join->on('a.batch_id', '=', 'b.id')
             ->on('a.student_enrollment_number', '=', 's.enrollment_number')
             ->on('a.admin_id', '=', 's.admin_id');
    })
    ->join('teachers as t', 't.id', '=', 'a.teacher_id')
    ->join('subjects as sub', function ($join) {
        $join->on('sub.id', '=', 'a.subject_id')
             ->on('sub.created_by', '=', 'a.admin_id');
    })
    ->where('s.enrollment_number', $student_EndrollmentNumber)
    ->where('s.admin_id', $adminId)
    ->select(
        'a.id as attendance_id',
        'a.date',
        'a.status',
        's.name as student_name',
        's.enrollment_number',
        'b.name as batch_name',
        'b.grade',
        'b.section',
        'sub.subject as subject_name',
        't.name as teacher_name',
        't.email as teacher_email'
    )
    ->orderBy('a.date', 'desc')
    ->get();
        return response()->json($studentAttendance);
    }
}

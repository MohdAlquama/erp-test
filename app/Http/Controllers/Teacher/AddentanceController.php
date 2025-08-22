<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Student;
use Illuminate\Support\Facades\Validator; // corrected import
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AddentanceController extends Controller
{
    public function index()
    {
        return Inertia::render('teacher/Addentance');
    }
    public function getStudentsByAdminAndBatch($adminId, $batchId)
    {
        $students = Student::where('admin_id', $adminId)
            ->whereJsonContains('batch_ids', $batchId)
            ->get();

        return response()->json([
            'message' => 'Students for admin and batch',
            'data' => $students
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|integer',
            'batch_id' => 'required|integer',
            'teacher_id' => 'required|integer',
            'admin_id' => 'required|integer',
            'date' => 'required|date',
            'status' => 'required|in:present,absent',
        ]);

        $attendance = Attendance::updateOrCreate(
            [
                'student_id' => $validated['student_id'],
                'batch_id' => $validated['batch_id'],
                'date' => $validated['date'],
            ],
            [
                'teacher_id' => $validated['teacher_id'],
                'admin_id' => $validated['admin_id'],
                'status' => $validated['status'],
            ]
        );

        return response()->json([
            'message' => 'Attendance saved successfully',
            'attendance' => $attendance,
        ]);
    }


    public function getAttendanceByFilters(Request $request)
    {
        $request->validate([
            'teacher_id' => 'required|integer',
            'admin_id' => 'required|integer',
            'batch_id' => 'required|integer',
            'date' => 'required|date',
        ]);

        $attendances = Attendance::where('teacher_id', $request->teacher_id)
            ->where('admin_id', $request->admin_id)
            ->where('batch_id', $request->batch_id)
            ->where('date', $request->date)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $attendances,
        ]);
    }
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|integer',
            'batch_id' => 'required|integer',
            'teacher_id' => 'required|integer',
            'admin_id' => 'required|integer',
            'date' => 'required|date',
            'status' => 'required|in:present,absent',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $attendance = Attendance::where('student_id', $request->student_id)
            ->where('batch_id', $request->batch_id)
            ->where('teacher_id', $request->teacher_id)
            ->where('admin_id', $request->admin_id)
            ->where('date', $request->date)
            ->first();

        if (!$attendance) {
            return response()->json(['message' => 'Attendance record not found'], 404);
        }

        $attendance->status = $request->status;
        $attendance->save();

        return response()->json(['data' => $attendance, 'message' => 'Attendance updated successfully']);
    }

    public function getByTeacherOrAdmin($teacher_id, $admin_id)
    {
        $attendanceRecords = Attendance::where('teacher_id', $teacher_id)
            ->Where('admin_id', $admin_id)
            ->whereYear('date', 2025)  // filter only year 2025

            ->get();

        return response()->json([
            'message' => 'Attendance fetched successfully',
            'data' => $attendanceRecords,
        ]);
    }

    public function getByStudentOrAdmin($student_id, $admin_id)
    {
        $attendanceRecords = Attendance::where('student_id', $student_id)
            ->where('admin_id', $admin_id)
            ->whereYear('date', 2025)  // filter only year 2025
            ->get();

        return response()->json([
            'message' => 'Attendance fetched successfully',
            'data' => $attendanceRecords,
        ]);
    }


/**
     * Save attendance records from frontend
     */
  
      public function SaveAttendance(Request $request)
    {
        $validated = $request->validate([
            'admin_id' => 'required|integer',
            'teacher_id' => 'required|integer',
            'subject_id' => 'required|integer',
            'batch_id' => 'required|integer',
            'teacher_name' => 'required|string',
            'subject_name' => 'required|string',
            'batch_name' => 'required|string',
            'student_name' => 'required|string',
            'student_enrollment_number' => 'required|string',
            'status' => 'required|in:present,absent',
            'date' => 'required|date',
        ]);

        // Optional: avoid duplicate attendance for same student + date + subject + batch
        $attendance = Attendance::updateOrCreate(
            [
                'student_enrollment_number' => $validated['student_enrollment_number'],
                'subject_id' => $validated['subject_id'],
                'batch_id' => $validated['batch_id'],
                'date' => $validated['date'],
            ],
            $validated
        );

        return response()->json([
            'success' => true,
            'message' => 'Attendance saved successfully',
            'data' => $attendance
        ]);
    }
/* checking attendance */

public function checkAttendance(Request $request)
{
    $validated = $request->validate([
        'teacher_id' => 'required|integer',
        'batch_id' => 'required|integer',
        'subject_id' => 'required|integer',
        'date' => 'required|date',
    ]);

    // Get attendance for this teacher, batch, subject and date
    $attendances = Attendance::where([
        'teacher_id' => $validated['teacher_id'],
        'batch_id' => $validated['batch_id'],
        'subject_id' => $validated['subject_id'],
        'date' => $validated['date'],
    ])->get();

    if ($attendances->isEmpty()) {
        return response()->json([
            'success' => false,
            'message' => 'Attendance not taken yet for this batch & date.',
        ]);
    }

    return response()->json([
        'success' => true,
        'data' => $attendances,
    ]);
}

 /**
     * Display a list of attendances filtered by admin, teacher, and batch creator.
     */
    public function indexing(Request $request , $adminId,$teacherId)
    {
        // You can make these dynamic from request if needed
       

        $attendances = Attendance::select(
                'attendances.id as attendance_id',
                'attendances.admin_id',
                'attendances.date',
                'attendances.status',
                'attendances.student_name',
                'attendances.student_enrollment_number',
                'teachers.name as teacher_name',
                'teachers.id as IDDD',
                'teachers.email as teacher_email',
                'batches.name as batch_name',
                'batches.created_by',
                'batches.grade',
                'batches.section'
            )
            ->join('teachers', 'teachers.id', '=', 'attendances.teacher_id')
            ->join('batches', 'batches.id', '=', 'attendances.batch_id')
            ->where('attendances.admin_id', $adminId)
            ->where('batches.created_by', $adminId)
            ->where('teachers.id', $teacherId)
            ->orderByDesc('attendances.date')
            ->get();
           $attendances = Attendance::select(
                'attendances.id as attendance_id',
                'attendances.date',
                'attendances.status',
                'attendances.student_name',
                'attendances.student_enrollment_number',
                'teachers.name as teacher_name',
                'teachers.email as teacher_email',
                'batches.name as batch_name',
                'batches.grade',
                'batches.section'
            )
            ->join('teachers', 'teachers.id', '=', 'attendances.teacher_id')
            ->join('batches', 'batches.id', '=', 'attendances.batch_id')
            ->where('attendances.admin_id', $adminId)
            ->where('teachers.id', $teacherId)
            ->orderByDesc('attendances.date')
            ->get();
//  $attendances = Attendance::select(
//                 'attendances.id as attendance_id',
//                 'attendances.admin_id',
//                 'attendances.teacher_id',
//                 'attendances.date',
//                 'attendances.status',
//                 'attendances.student_name',
//                 'attendances.student_enrollment_number',
//                 'teachers.name as teacher_name',
//                 'teachers.email as teacher_email',
//                 'batches.name as batch_name',
//                 'batches.grade',
//                 'batches.section'
//             )
//             ->join('teachers', 'teachers.id', '=', 'attendances.teacher_id')
//             ->join('batches', 'batches.id', '=', 'attendances.batch_id')
//             ->where('attendances.admin_id', $adminId)
//             ->where('teachers.id', $teacherId)
//             ->orderByDesc('attendances.date')
//             ->get();

// $attendance = DB::table('attendances as a')
//     ->join('teachers as t', 't.id', '=', 'a.teacher_id')
//     ->join('batches as b', 'b.id', '=', 'a.batch_id')
//     ->where('t.id', $teacherId)
//     ->where('a.admin_id', $adminId)
//     ->select(
//         'a.id as attendance_id',
//         'a.admin_id',
//         'a.teacher_id',
//         'a.date',
//         'a.status',
//         'a.student_name',
//         'a.student_enrollment_number',
//         't.name as teacher_name',
//         't.email as teacher_email',
//         'b.name as batch_name',
//         'b.grade',
//         'b.section'
//     )
//     ->orderBy('a.date', 'desc')
//     ->get();
        return response()->json([
            'success' => true,
            'data' => $attendances
        ]);
    }
}

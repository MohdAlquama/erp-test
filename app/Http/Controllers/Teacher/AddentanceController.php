<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Attendace;
use App\Models\Student;
use Illuminate\Support\Facades\Validator; // corrected import
use Illuminate\Http\Request;
use Inertia\Inertia;

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

        $attendance = Attendace::updateOrCreate(
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

        $attendances = Attendace::where('teacher_id', $request->teacher_id)
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

        $attendance = Attendace::where('student_id', $request->student_id)
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
        $attendanceRecords = Attendace::where('teacher_id', $teacher_id)
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
        $attendanceRecords = Attendace::where('student_id', $student_id)
            ->where('admin_id', $admin_id)
            ->whereYear('date', 2025)  // filter only year 2025
            ->get();

        return response()->json([
            'message' => 'Attendance fetched successfully',
            'data' => $attendanceRecords,
        ]);
    }




}

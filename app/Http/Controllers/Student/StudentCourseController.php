<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\batch_subject_teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;


class StudentCourseController extends Controller
{
     public function index()
    {
        return Inertia::render('student/MyCourses');
    }
public function MyCourses($batch_id,$admin_id)
{
    $data = batch_subject_teacher::with(['batch', 'subject', 'teacher'])
        ->where('batch_id', $batch_id)    // your batch_id
        ->where('admin_id', $admin_id)     // your admin_id
        ->get()
        ->map(function ($item) {
            return [
                'batch_id' => $item->batch->id,
                'batch_name' => $item->batch->name,
                'grade' => $item->batch->grade,
                'section' => $item->batch->section,
                'batch_admin_id' => $item->batch->created_by,

                'subject_id' => $item->subject->id,
                'subject_name' => $item->subject->subject,
                'subject_admin_id' => $item->subject->created_by,

                'teacher_id' => $item->teacher->id,
                'teacher_name' => $item->teacher->name,
                'teacher_email' => $item->teacher->email,
                'teacher_status' => $item->teacher->status,
                'teacher_admin_id' => $item->teacher->admin_id,

                'assigned_by_admin_id' => $item->admin_id,
            ];
        });

    return response()->json($data); // ✅ always return JSON
}



}

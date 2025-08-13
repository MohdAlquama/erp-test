<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use App\Models\Subject;
use App\Models\Teachers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class BatchViewController extends Controller
{
    public function index($adminId, $batchId)
    {
        $teachers = Teachers::where('admin_id', $adminId)->
whereJsonContains('batch_ids', (int) $batchId)            ->get();

        return response()->json([
            'message' => 'Teachers fetched successfully',
            'data' => $teachers
        ]);
    }
     public function assignSubject(Request $request, $admin_id, $batch_id)
    {
        $request->validate([
            'teacher_id' => 'required|exists:teachers,id',
            'subject_id' => 'required|exists:subjects,id',
        ]);

        // Ensure the batch belongs to this admin
        $batch = Batch::where('id', $batch_id)
            ->where('created_by', $admin_id)
            ->firstOrFail();

        // Ensure teacher belongs to this admin and batch
        $teacher = Teachers::where('id', $request->teacher_id)
            ->where('admin_id', $admin_id)
            ->whereJsonContains('batch_ids', (int)$batch_id)
            ->firstOrFail();

        // Ensure subject belongs to this admin
        $subject = Subject::where('id', $request->subject_id)
            ->where('created_by', $admin_id)
            ->firstOrFail();

        // Save assignment to pivot table (avoid duplicates with upsert)
        DB::table('batch_subject_teacher')->updateOrInsert(
            [
                'batch_id' => $batch_id,
                'teacher_id' => $teacher->id,
                'subject_id' => $subject->id,
                'admin_id' => $admin_id
            ],
            [
                'updated_at' => now(),
                'created_at' => now(),
            ]
        );

        return response()->json([
            'message' => 'Subject assigned to teacher successfully',
            'data' => [
                'batch' => $batch,
                'teacher' => $teacher,
                'subject' => $subject
            ]
        ]);
    }

    /**
 * Get all subject assignments (teacher + subject) for given admin and batch
 */
public function getAssignments($adminId, $batchId)
{
$assignments = DB::table('batch_subject_teacher')
    ->where('batch_subject_teacher.admin_id', $adminId)
    ->where('batch_subject_teacher.batch_id', $batchId)
    ->join('teachers', 'batch_subject_teacher.teacher_id', '=', 'teachers.id')
    ->join('subjects', 'batch_subject_teacher.subject_id', '=', 'subjects.id')
    ->select(
        'batch_subject_teacher.id as assignment_id',
        'teachers.id as teacher_id',
        'teachers.name as teacher_name',
        'teachers.email as teacher_email',
        'subjects.id as subject_id',
        'subjects.subject as subject_name',
        'batch_subject_teacher.created_at'
    )
    ->get();


    return response()->json([
        'message' => 'Assignments fetched successfully',
        'data' => $assignments,
    ]);
}
// Delete assignment
public function deleteAssignment($adminId, $batchId, $assignmentId)
{
    $assignment = DB::table('batch_subject_teacher')
        ->where('id', $assignmentId)
        ->where('admin_id', $adminId)
        ->where('batch_id', $batchId)
        ->first();

    if (!$assignment) {
        return response()->json(['message' => 'Assignment not found'], 404);
    }

    DB::table('batch_subject_teacher')->where('id', $assignmentId)->delete();

    return response()->json(['message' => 'Assignment deleted successfully']);
}

// Edit assignment (change subject or teacher for the assignment)
public function editAssignment(Request $request, $adminId, $batchId, $assignmentId)
{
    $request->validate([
        'teacher_id' => 'required|exists:teachers,id',
        'subject_id' => 'required|exists:subjects,id',
    ]);

    $assignment = DB::table('batch_subject_teacher')
        ->where('id', $assignmentId)
        ->where('admin_id', $adminId)
        ->where('batch_id', $batchId)
        ->first();

    if (!$assignment) {
        return response()->json(['message' => 'Assignment not found'], 404);
    }

    // Check teacher belongs to admin and batch
    $teacher = Teachers::where('id', $request->teacher_id)
        ->where('admin_id', $adminId)
        ->whereJsonContains('batch_ids', (int)$batchId)
        ->first();

    if (!$teacher) {
        return response()->json(['message' => 'Teacher invalid for this batch/admin'], 400);
    }

    // Check subject belongs to admin
    $subject = Subject::where('id', $request->subject_id)
        ->where('created_by', $adminId)
        ->first();

    if (!$subject) {
        return response()->json(['message' => 'Subject invalid for this admin'], 400);
    }

    DB::table('batch_subject_teacher')
        ->where('id', $assignmentId)
        ->update([
            'teacher_id' => $request->teacher_id,
            'subject_id' => $request->subject_id,
            'updated_at' => now(),
        ]);

    return response()->json(['message' => 'Assignment updated successfully']);
}

// Remove teacher from batch (remove batch_id from teacher->batch_ids array)
public function removeTeacherFromBatch($adminId, $batchId, $teacherId)
{
    $teacher = Teachers::where('id', $teacherId)
        ->where('admin_id', $adminId)
        ->first();

    if (!$teacher) {
        return response()->json(['message' => 'Teacher not found'], 404);
    }

    $batchIds = $teacher->batch_ids ?? [];
    if (!in_array($batchId, $batchIds)) {
        return response()->json(['message' => 'Teacher not assigned to this batch'], 400);
    }

    $updatedBatchIds = array_filter($batchIds, fn($id) => $id != $batchId);

    $teacher->batch_ids = array_values($updatedBatchIds);
    $teacher->save();

    // Optional: delete all assignments of this teacher in this batch
    DB::table('batch_subject_teacher')
        ->where('teacher_id', $teacherId)
        ->where('batch_id', $batchId)
        ->delete();

    return response()->json(['message' => 'Teacher removed from batch successfully']);
}

}

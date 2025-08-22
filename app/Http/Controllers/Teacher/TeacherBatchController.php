<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Batch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class TeacherBatchController extends Controller
{
    public function getBatchesByAdmin($adminId)
    {
        $batches = Batch::where('created_by', $adminId)->get(['id', 'name']);

        return response()->json([
            'success' => true,
            'data' => $batches
        ]);
    }


    /**
     * Get subjects assigned to a teacher in a specific batch.
     */
    public function getSubjects(Request $request)
    {
        $request->validate([
            'admin_id'   => 'required|integer',
            'batch_id'   => 'required|integer',
            'teacher_id' => 'required|integer',
        ]);

        $subjects = DB::table('batch_subject_teacher as bst')
            ->join('subjects as s', 'bst.subject_id', '=', 's.id')
            ->where('bst.admin_id', $request->admin_id)
            ->where('bst.batch_id', $request->batch_id)
            ->where('bst.teacher_id', $request->teacher_id)
            ->select('s.id', 's.subject')
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $subjects,
        ]);
    }

     /**
     * Get teacher's related subject, batch, and students
     */
    public function getTeacherSubjectDetails(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'admin_id'   => 'required|integer',
            'teacher_id' => 'required|integer',
            'subject_id' => 'required|integer',
            'batch_id'   => 'required|integer',
        ]);

        $adminId   = $request->admin_id;
        $teacherId = $request->teacher_id;
        $subjectId = $request->subject_id;
        $batchId   = $request->batch_id;

        // Run SQL using Query Builder
        $data = DB::table('batch_subject_teacher as bst')
            ->join('teachers as t', function ($join) {
                $join->on('bst.teacher_id', '=', 't.id')
                     ->on('bst.admin_id', '=', 't.admin_id');
            })
            ->join('subjects as s', function ($join) {
                $join->on('bst.subject_id', '=', 's.id')
                     ->on('s.created_by', '=', 'bst.admin_id');
            })
            ->join('batches as b', function ($join) {
                $join->on('bst.batch_id', '=', 'b.id')
                     ->on('b.created_by', '=', 'bst.admin_id');
            })
            ->join('students as st', function ($join) {
                $join->on('st.batch_ids', '=', 'b.id')
                     ->on('st.admin_id', '=', 'bst.admin_id');
            })
            ->where('bst.admin_id', $adminId)
            ->where('bst.teacher_id', $teacherId)
            ->where('bst.subject_id', $subjectId)
            ->where('bst.batch_id', $batchId)
            ->select(
                't.name as teacher_name',
                's.subject as subject_name',
                'b.name as batch_name',
                'st.name as student_name',
                'st.enrollment_number'
            )
            ->get();

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }


    
}

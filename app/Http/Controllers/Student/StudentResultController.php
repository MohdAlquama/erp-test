<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
class StudentResultController extends Controller
{
    //
      public function index()
    {
    return Inertia::render('student/Result');
    }

     /**
     * Fetch approved results with admit card & batch details
     */
    public function getStudentResults($adminId,$folderName, $batchId, $enrollmentNumber)
    {
        $results = DB::table('students as s')
            ->join('admit_card_folders as acf', function($join) {
                $join->on('s.session', '=', 'acf.year')
                     ->on('s.admin_id', '=', 'acf.admin_id');
            })
            ->join('batches as b', function($join) {
                $join->on('s.batch_ids', '=', 'b.id')
                     ->on('s.admin_id', '=', 'b.created_by');
            })
            ->join('batch_subject_teacher as bst', function($join) {
                $join->on('bst.batch_id', '=', 'b.id')
                     ->on('bst.admin_id', '=', 's.admin_id');
            })
            ->join('subjects as sub', function($join) {
                $join->on('sub.id', '=', 'bst.subject_id')
                     ->on('sub.created_by', '=', 's.admin_id');
            })
            ->leftJoin('admit_card_issues as aci', function($join) {
                $join->on('aci.enrollment_number', '=', 's.enrollment_number')
                     ->on('aci.subject_name', '=', 'sub.subject')
                     ->on('aci.folder_id', '=', 'acf.id')
                     ->on('aci.batch_id', '=', 'b.id')
                     ->on('aci.admin_id', '=', 's.admin_id');
            })
            ->leftJoin('results as r', function($join) {
                $join->on('r.enrollment_number', '=', 's.enrollment_number')
                     ->on('r.subject_name', '=', 'sub.subject')
                     ->on('r.folder_id', '=', 'acf.id')
                     ->on('r.batch_id', '=', 'b.id')
                     ->on('r.admin_id', '=', 's.admin_id');
            })
            ->select(
                's.id as student_id',
                's.name as student_name',
                's.enrollment_number',
                's.session as student_session',
                'acf.id as folder_id',
                'acf.folder_name',
                'acf.year as folder_year',
                'b.id as batch_id',
                'b.name as batch_name',
                'sub.id as subject_id',
                'sub.subject as subject_name',
                'bst.teacher_id',
                'aci.id as admit_card_issue_id',
                'aci.exam_venue',
                'aci.exam_date',
                'aci.exam_time',
                'r.id as result_id',
                'r.max_marks',
                'r.scored_marks',
                'r.status as result_status'
            )
            ->where('s.status', 'Active')
            ->where('r.status', 'approved')
            ->where('acf.folder_name', $folderName)
            ->where('b.id', $batchId)
            ->where('s.admin_id', $adminId)
            ->where('s.enrollment_number', $enrollmentNumber)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $results
        ]);
    }
}

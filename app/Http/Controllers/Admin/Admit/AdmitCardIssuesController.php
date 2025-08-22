<?php

namespace App\Http\Controllers\Admin\Admit;

use App\Http\Controllers\Controller;
use App\Models\admit_card_issues;
use Illuminate\Http\Request;

class AdmitCardIssuesController extends Controller
{
    public function store(Request $request, $adminId)
    {
        $data = $request->validate([
            'folder_id' => 'required|exists:admit_card_folders,id',
            'batch_id' => 'required|exists:batches,id', // ✅ batch_id added
            'enrollment_number' => 'required|string',
            'subject_name' => 'required|string',
            'batch_name' => 'required|string',
            'teacher_name' => 'required|string',
            'student_name' => 'required|string',
            'exam_venue' => 'nullable|string',
            'exam_date' => 'nullable|date',
            'exam_time' => 'nullable',
        ]);

        $data['admin_id'] = $adminId;

        $issue = admit_card_issues::create($data);

        return response()->json([
            'message' => 'Admit card saved successfully',
            'data' => $issue
        ]);
    }

   public function getData($admin_id, $folder_id, $batch_id)
{
    $data = admit_card_issues::where('admin_id', $admin_id)
        ->where('folder_id', $folder_id)
        ->where('batch_id', $batch_id) // ✅ fixed
        ->select(
            'id',
            'admin_id',
            'folder_id',
            'batch_id', // ✅ fetched
            'enrollment_number',
            'subject_name',
            'batch_name',
            'teacher_name',
            'student_name',
            'exam_venue',
            'exam_date',
            'exam_time',
            'created_at',
            'updated_at'
        )
        ->get();

    return response()->json($data);
}

}

<?php

namespace App\Http\Controllers\Admin\Admit;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use App\Models\batch_folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class BatchFolderController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'admin_id' => 'required|exists:admins,id',
            'batch_id' => 'required|exists:batches,id',
            'folder_id' => 'required|exists:admit_card_folders,id',
        ]);

        $batchFolder = batch_folder::create($request->only(['admin_id', 'batch_id', 'folder_id']));

        return response()->json(['message' => 'Batch linked to folder successfully', 'data' => $batchFolder], 201);
    }
    public function getAdminFolderData(Request $request)
{
    $request->validate([
        'admin_id' => 'required|exists:admins,id',
        'folder_id' => 'required|exists:admit_card_folders,id',
    ]);

    $data = batch_folder::where('admin_id', $request->admin_id)
                        ->where('folder_id', $request->folder_id)
                        ->get();

    return response()->json([
        'message' => 'Data fetched successfully',
        'data' => $data,
    ]);
}
public function destroy(Request $request, $id)
{
    $adminId = $request->query('admin_id'); // get admin_id from query param

    // Optionally, you can check if $adminId is authorized to delete this record

    $batchFolder = batch_folder::find($id);

    if (!$batchFolder) {
        return response()->json(['message' => 'Batch-folder link not found'], 404);
    }

    // For extra security, you can verify admin_id matches
    if ($batchFolder->admin_id != $adminId) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $batchFolder->delete();

    return response()->json(['message' => 'Batch-folder link deleted successfully']);
}
    public function getBatchesByIds(Request $request)
    {
        // Validate request to ensure 'batch_ids' is an array of integers
        $data = $request->validate([
            'batch_ids' => 'required|array',
            'batch_ids.*' => 'integer|exists:batches,id',
        ]);

        // Fetch batches with given IDs
        $batches = Batch::whereIn('id', $data['batch_ids'])->get();

        return response()->json([
            'message' => 'Batches fetched successfully',
            'batches' => $batches,
        ]);
    }
public function getIenertiaParamShowOfSubject($id, $folder_id, $adminId)
{
    $Batch_id = base64_decode($id);
    $admitCardFolderId = base64_decode($folder_id);

    $data = DB::table('admit_card_folders as f')
        ->join('batch_folders as bf', 'f.id', '=', 'bf.folder_id')
        ->join('batches as b', 'bf.batch_id', '=', 'b.id')
        ->join('batch_subject_teacher as bst', 'b.id', '=', 'bst.batch_id')
        ->join('subjects as s', 'bst.subject_id', '=', 's.id')
        ->join('teachers as t', 'bst.teacher_id', '=', 't.id')
         ->leftJoin('students as st', 'st.batch_ids', '=', 'b.id') // ✅ simple equality

        ->where('f.id', $admitCardFolderId)
        ->where('b.id', $Batch_id)
        ->where('bf.admin_id', $adminId)
        ->where('b.created_by', $adminId)
        ->where('bst.admin_id', $adminId)
        ->where('s.created_by', $adminId)
        ->where('t.admin_id', $adminId)
        ->select(
            's.id as subject_id',
            's.subject as subject_name',
            'b.id as batch_id',
            'b.name as batch_name',
            't.id as teacher_id',
            't.name as teacher_name',
            'st.id as student_id',
            'st.enrollment_number as enrollment_number',
            'st.name as student_name',
            'f.id as folder_id'  // ✅ only folder ID
        )
        ->get();

    return Inertia::render('admin/admitCard/AdmitCard', [
        'message' => 'admit_card_folders fetched successfully',
        'admit_card_folders_data' => $data,
        'folderId' =>$admitCardFolderId,
        'batchId'=>$Batch_id
    ]);
}




// public function getIenertiaParamShowOfSubject($id,$folder_id,$adminId){
//     $Batch_id = base64_decode($id);
//     $admitCardFolderId=base64_decode($folder_id); //f.id
       
// $data = DB::table('admit_card_folders as f')
//     ->join('batch_folders as bf', 'f.id', '=', 'bf.folder_id')
//     ->join('batches as b', 'bf.batch_id', '=', 'b.id')
//     ->join('batch_subject_teacher as bst', 'b.id', '=', 'bst.batch_id')
//     ->join('subjects as s', 'bst.subject_id', '=', 's.id')
//     ->join('teachers as t', 'bst.teacher_id', '=', 't.id')
    
//     ->where('f.id', $admitCardFolderId)
//     ->where('b.id', $Batch_id)
//     ->where('bf.admin_id', $adminId)
//     ->where('b.created_by', $adminId)
//     ->where('bst.admin_id', $adminId)
//     ->where('s.created_by', $adminId)
//     ->where('t.admin_id', $adminId)
//     ->select(
//         's.id as subject_id',
//         's.subject as subject_name',
//         'b.id as batch_id',
//         'b.name as batch_name',
//         't.id as teacher_id',
//         't.name as teacher_name',
//         'st.id as student_id',
//         'st.name as student_name'
//     )
//     ->get();

//     return Inertia::render('admin/admitCard/AdmitCard',[
//            'message' => 'admit_card_folders fetched successfully',
//             'admit_card_folders_data' => $data,
//     ]);
// }
}

<?php

namespace App\Http\Controllers\Admin\Admit;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use App\Models\batch_folder;
use Illuminate\Http\Request;
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
}

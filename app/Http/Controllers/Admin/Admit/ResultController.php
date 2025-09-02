<?php

namespace App\Http\Controllers\Admin\Admit;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Result;

class ResultController extends Controller
{
    // Store new result
    public function store(Request $request, $adminId)
    {
        $data = $request->validate([
            'folder_id'          => 'required|exists:admit_card_folders,id',
            'batch_id'           => 'required|exists:batches,id',
            'admit_card_id'      => 'required|integer',
            'enrollment_number'  => 'required|string',
            'subject_name'       => 'required|string',
            'student_name'       => 'required|string',   // ✅ added
            'max_marks'          => 'required|integer|min:1',
            'scored_marks'       => 'required|integer|min:0',
            'status'             => 'in:pending,approved,rejected',
        ]);

        $data['admin_id'] = $adminId;

        $result = Result::create($data);

        return response()->json([
            'message' => 'Result saved successfully',
            'data'    => $result
        ], 201);
    }

    // Fetch results by batch/folder
    public function index($adminId, $folderId, $batchId)
    {
        $results = Result::where('admin_id', $adminId)
            ->where('folder_id', $folderId)
            ->where('batch_id', $batchId)
            ->get();

        return response()->json($results);
    }
   // ✅ Delete result by admin_id + enrollment_number
    public function destroy($adminId, $enrollment)
    {
        $result = Result::where('admin_id', $adminId)
            ->where('enrollment_number', $enrollment)
            ->first();

        if (!$result) {
            return response()->json(['message' => 'Result not found'], 404);
        }

        $result->delete();

        return response()->json(['message' => 'Result deleted successfully']);
    }

  /**
     * Bulk approve results for a given admin, batch, and folder
     */
    public function approveAll(Request $request)
    {
        $request->validate([
            'admin_id'  => 'required|integer',
            'batch_id'  => 'required|integer',
            'folder_id' => 'required|integer',
        ]);

        $updated = Result::where('admin_id', $request->admin_id)
            ->where('batch_id', $request->batch_id)
            ->where('folder_id', $request->folder_id)
            ->update(['status' => 'approved']); // ✅ Bulk update

        return response()->json([
            'success' => true,
            'message' => $updated > 0 
                ? "$updated results approved successfully"
                : "No results found for given criteria",
            'updated_count' => $updated
        ]);
    }
}

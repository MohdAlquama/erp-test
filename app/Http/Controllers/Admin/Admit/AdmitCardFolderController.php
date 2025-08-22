<?php

namespace App\Http\Controllers\Admin\Admit;

use App\Http\Controllers\Controller;
use App\Models\admit_card_folders;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdmitCardFolderController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/admitCard/AdmitCardFolder');
    }

    public function store(Request $request, $adminId)
    {
        $request->validate([
            'folderName' => 'required|string|max:255',
            'description' => 'nullable|string',
            'year' => 'nullable',
            'exam_type_id' => 'nullable'
        ]);

        admit_card_folders::create([
            'admin_id' => $adminId,
            'folder_name' => $request->folderName,
            'description' => $request->description,
            'year' => $request->year,
            'exam_type_id' => $request->exam_type_id
        ]);

        return response()->json(['message' => 'Folder created successfully']);
    }

    public function indexs($adminId)
    {
        $folders = admit_card_folders::where('admin_id', $adminId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['folders' => $folders]);
    }

    public function update(Request $request, $adminId, $id)
    {
        $request->validate([
            'folderName' => 'required|string|max:255',
            'description' => 'nullable|string',
            'year' => 'nullable|integer',
            'exam_type_id' => 'nullable'
        ]);

        $folder = admit_card_folders::where('admin_id', $adminId)->findOrFail($id);
        $folder->update([
            'folder_name' => $request->folderName,
            'description' => $request->description,
            'year' => $request->year,          // ✅ include year
            'exam_type_id' => $request->exam_type_id,  // ✅ include exam type
        ]);

        return response()->json(['message' => 'Folder updated successfully']);
    }

    public function destroy($adminId, $id)
    {
        $folder = admit_card_folders::where('admin_id', $adminId)->findOrFail($id);
        $folder->delete();

        return response()->json(['message' => 'Folder deleted successfully']);
    }

    public function getIenertiaParamShow($encodedId)
    {
        // Decode Base64 back to original ID
        $id = base64_decode($encodedId);

        $folder = admit_card_folders::findOrFail($id);
        return Inertia::render('admin/admitCard/CreatedBatch', [
            'folder' => $folder
        ]);
    }



}

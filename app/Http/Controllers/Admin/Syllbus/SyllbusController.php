<?php

namespace App\Http\Controllers\Admin\Syllbus;

use App\Http\Controllers\Controller;
use App\Models\Syllabus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
class SyllbusController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/syllabus/Syllabus');
    }
      /**
     * Store syllabus files.
     */
      public function store(Request $request, $adminId)
    {
        $request->validate([
            'syllabus.*.batch_id' => 'required|exists:batches,id',
            'syllabus.*.file' => 'required|file|mimes:pdf,doc,docx',
        ]);

        $syllabusInputs = $request->input('syllabus', []);
        $syllabusFiles = $request->file('syllabus', []);

        foreach ($syllabusInputs as $index => $data) {
            $batchId = $data['batch_id'] ?? null;
            $file = $syllabusFiles[$index]['file'] ?? null;

            if ($batchId && $file) {
                $path = $file->store('syllabus_files', 'public');

                // If multiple files per batch, merge with existing
                $syllabus = Syllabus::firstOrNew([
                    'admin_id' => $adminId,
                    'batch_id' => $batchId,
                ]);

                $existingFiles = $syllabus->file_path ?? [];
                $existingFiles[] = $path;

                $syllabus->admin_id = $adminId;
                $syllabus->batch_id = $batchId;
                $syllabus->file_path = $existingFiles;
                $syllabus->save();
            }
        }

        return response()->json([
            'message' => 'Syllabus uploaded successfully.'
        ]);
    }

 public function show($adminId)
{
    $syllabus = Syllabus::where('admin_id', $adminId)->get();
    return response()->json(['syllabus' => $syllabus]);
}
 // Delete syllabus
  public function destroy($adminId, $id)
{
    $syllabus = Syllabus::where('admin_id', $adminId)->findOrFail($id);

    // Get the array of file paths
    $files = $syllabus->file_path;

    // Ensure $files is an array
    if (!is_array($files)) {
        $files = json_decode($files, true) ?? [];
    }

    // Delete each file individually
    foreach ($files as $file) {
        if ($file && Storage::disk('public')->exists($file)) {
            Storage::disk('public')->delete($file);
        }
    }

    $syllabus->delete();

    return response()->json(['message' => 'Syllabus deleted']);
}

 // Update existing syllabus
    public function update(Request $request, $adminId, $syllabusId)
{
    $syllabus = Syllabus::findOrFail($syllabusId);

    $request->validate([
        'batch_id' => 'required|exists:batches,id',
        'files.*' => 'file|mimes:pdf,docx,doc',
        'existing_files.*' => 'string',
    ]);

    $existingFiles = $request->input('existing_files', []); // files kept by user
    $newFiles = $request->file('files', []);

    // Delete removed files from storage
    $currentFiles = is_array($syllabus->file_path) ? $syllabus->file_path : [$syllabus->file_path];
    $filesToDelete = array_diff($currentFiles, $existingFiles);
    foreach ($filesToDelete as $file) {
        if (\Storage::exists($file)) {
            \Storage::delete($file);
        }
    }

    // Save new files
    $uploadedFiles = [];
    foreach ($newFiles as $file) {
        $path = $file->store('syllabus_files', 'public');
        $uploadedFiles[] = $path;
    }

    // Merge remaining existing files + newly uploaded
    $syllabus->file_path = array_merge($existingFiles, $uploadedFiles);
    $syllabus->batch_id = $request->batch_id;
    $syllabus->save();

    return response()->json(['message' => 'Syllabus updated successfully', 'syllabus' => $syllabus]);
}

}

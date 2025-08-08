<?php
namespace App\Http\Controllers;

use App\Models\Teachers;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index($adminId)
    {
        $teachers = Teachers::where('admin_id', $adminId)->get();
        return response()->json($teachers);
    }

    public function store(Request $request, $adminId)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email',
            'password' => 'required|string|',
            'status' => 'required|in:Active,Inactive',
            'batch_ids' => 'nullable|array',
            'subject_ids' => 'nullable|array',
        ]);


        $teacher = Teachers::create($data);

        return response()->json([
            'message' => 'Teacher added successfully',
            'teacher' => $teacher
        ], 201);
    }

    public function destroy($id)
    {
        $teacher = Teachers::findOrFail($id);
        $teacher->delete();

        return response()->json(['message' => 'Teacher deleted']);
    }
}

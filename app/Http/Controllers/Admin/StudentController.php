<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function getByAdmin($adminId)
    {
        $students = Student::where('admin_id', $adminId)->get();

        return response()->json([
            'data' => $students
        ]);
    }

    public function getLoginPage()
    {
        return Inertia::render('Auth/StudentLogin');
    }

    public function getLoginDetailsCheck(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $student = Student::where('email', $credentials['email'])->first();

        if (!$student) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        if (!Hash::check($credentials['password'], $student->password)) {
            return response()->json(['message' => 'Invalid password.'], 401);
        }

        if ($student->status !== 'Active') {
            return response()->json(['message' => 'Account is inactive. Contact administrator.'], 403);
        }

        $studentSession = [
            'id' => $student->id,
            'name' => $student->name,
            'email' => $student->email,
            'enrollment_number' => $student->enrollment_number,
            'contact_number' => $student->contact_number,
            'batch_ids' => $student->batch_ids,
          
            'admin_id' => $student->admin_id,
            'status' => $student->status,
            'created_at' => $student->created_at->toDateString(),
        ];

        $request->session()->put('student', $studentSession);

        return response()->json([
            'message' => 'Login successful',
            'user' => $studentSession,
            'detail' => $student->makeHidden(['password']),
        ]);
    }

    public function index()
    {
        $students = Student::all();

        return response()->json([
            'data' => $students
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'admin_id' => 'nullable|string',
            'name' => 'required|string|max:255',
            'father_name' => 'nullable|string|max:255',
            'gender' => 'nullable|string|max:10',
            'dob' => 'nullable|date',
            'session' => 'nullable|string',
            'email' => 'required|email|unique:students,email',
            'password' => 'nullable|string|min:6',
            'enrollment_number' => 'required|string|unique:students,enrollment_number',
            'contact_number' => 'nullable|string|max:20',
            'status' => 'required|in:Active,Inactive',
            'batch_ids' => 'nullable|array',
            'profile_image' => 'nullable|image|max:2048',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        // Handle profile image upload
        if ($request->hasFile('profile_image')) {
            $validated['profile_image'] = $request->file('profile_image')->store('students', 'public');
        }

        $student = Student::create($validated);

        return response()->json([
            'message' => 'Student created successfully',
            'data' => $student
        ], 201);
    }

    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'admin_id' => 'nullable|string',
            'name' => 'required|string|max:255',
            'father_name' => 'nullable|string|max:255',
            'gender' => 'nullable|string|max:10',
            'dob' => 'nullable|date',
            'session' => 'nullable|string',
            'email' => 'required|email|unique:students,email,' . $student->id,
            'password' => 'nullable|string|min:6',
            'enrollment_number' => 'required|string|unique:students,enrollment_number,' . $student->id,
            'contact_number' => 'nullable|string|max:20',
            'status' => 'required|in:Active,Inactive',
            'batch_ids' => 'nullable|array',
            'profile_image' => 'nullable|image|max:2048',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        // Handle profile image replacement
        if ($request->hasFile('profile_image')) {
            if ($student->profile_image) {
                Storage::disk('public')->delete($student->profile_image);
            }
            $validated['profile_image'] = $request->file('profile_image')->store('students', 'public');
        }

        $student->update($validated);

        return response()->json([
            'message' => 'Student updated successfully',
            'data' => $student
        ], 200);
    }

    public function details($id)
    {
        $student = Student::findOrFail($id);

        return response()->json([
            'id' => $student->id,
            'admin_id' => $student->admin_id,
            'name' => $student->name,
            'father_name' => $student->father_name,
            'gender' => $student->gender,
            'dob' => $student->dob,
            'email' => $student->email,
            'enrollment_number' => $student->enrollment_number,
            'contact_number' => $student->contact_number,
            'batch_ids' => $student->batch_ids,
            'subject_ids' => $student->subject_ids,
            'teacher_ids' => $student->teacher_ids,
            'status' => $student->status,
            'profile_image' => $student->profile_image ? Storage::url($student->profile_image) : null,
            'created_at' => $student->created_at->toDateString(),
        ]);
    }

    public function destroy(Request $request, $adminId, $studentId)
    {
        $request->validate([
            'enrollment_number' => 'required|string',
        ]);

        $enrollmentNumber = $request->input('enrollment_number');

        $student = Student::where('id', $studentId)
            ->where('admin_id', $adminId)
            ->where('enrollment_number', $enrollmentNumber)
            ->first();

        if (!$student) {
            return response()->json(['message' => 'Student not found or credentials do not match'], 404);
        }

        if ($student->profile_image) {
            Storage::disk('public')->delete($student->profile_image);
        }

        $student->delete();

        return response()->json(['message' => 'Student deleted successfully']);
    }
}

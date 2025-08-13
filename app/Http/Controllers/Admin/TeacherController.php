<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Teachers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class TeacherController extends Controller
{

  
    public function getInertia()
    {
        return Inertia::render('Auth/TeacherLogin');
    }

    public function login (Request $request) {
    $data = $request->validate([
        'email' => 'required|email',
        'password' => 'required|string',
    ]);

    $teacher = Teachers::where('email', $data['email'])->first();

    if ($teacher && $data['password'] === $teacher->password) {
        // Store teacher session
        Session::put('teacher', [
            'id' => $teacher->id,
            'name' => $teacher->name,
            'email' => $teacher->email,
            'status' => $teacher->status,
            'batch_ids' => $teacher->batch_ids,
            'subject_ids' => $teacher->subject_ids,
            'admin_id' => $teacher->admin_id,
            'role' => $teacher->role,
        ]);

        return response()->json([
            'message' => 'Login successful',
            'teacher' => Session::get('teacher')
        ], 200);
       
    }

    return response()->json([
        'message' => 'Invalid email or password'
    ], 401);
}

    public function logout(Request $request)
    {
        Session::forget('teacher');
        return response()->json([
            'message' => 'Logout successful'
        ], 200);
    }
}


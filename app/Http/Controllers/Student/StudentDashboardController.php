<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('student/StudentDashboard',[
            'student' => session('student'), // Pass student session data
            
        ]);
    }

     public function logout(Request $request)
    {
        // Clear student session
        $request->session()->forget('student');
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirect to student login page
        return redirect()->route('student.login');
    }
}

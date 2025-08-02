<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;


class StudentCourseController extends Controller
{
     public function index()
    {
        return Inertia::render('student/Course');
    }

  // Display a single course detail
    public function show($id)
    {
        $course = Course::findOrFail($id);

        return Inertia::render('student/CourseDetails', [
            'course' => $course,
        ]);
    }

}

<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentIcardController extends Controller
{
    public function index()
    {
        return Inertia::render('student/IcardStudent');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Subject;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index(Request $request)
    {
       

        return Inertia::render('admin/Subject');
    }

    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
        ]);

        $adminId = $request->session()->get('admin.id');

        Subject::create([
            'subject' => $request->subject,
            'created_by' => $adminId,
        ]);

        return redirect()->back()->with('success', 'Subject added successfully!');
    }

    public function get ($id)
    {

        $subjects = Subject::where('created_by', $id)
            ->orderBy('id', 'desc')
            ->get();

        return response()->json($subjects);

    }
}

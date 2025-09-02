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

    public function update(Request $request, $id)
{
    $request->validate([
        'subject' => 'required|string|max:255',
        'admin_id' => 'required|integer',
    ]);

    $subject = Subject::where('id', $id)
        ->where('created_by', $request->admin_id) // ✅ ensure only owner can edit
        ->firstOrFail();

    $subject->update([
        'subject' => $request->subject,
    ]);

    return response()->json(['success' => true, 'message' => 'Subject updated successfully!']);
}

public function destroy(Request $request, $id)
{
    $request->validate([
        'admin_id' => 'required|integer',
    ]);

    $subject = Subject::where('id', $id)
        ->where('created_by', $request->admin_id) // ✅ ensure only owner can delete
        ->firstOrFail();

    $subject->delete();

    return response()->json(['success' => true, 'message' => 'Subject deleted successfully!']);
}

}

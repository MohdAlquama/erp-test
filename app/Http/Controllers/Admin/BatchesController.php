<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BatchesController extends Controller
{
      public function indexs()
    {
        return Inertia::render('admin/Batches');
    }

   public function index($id)
{
    // Optional: validate $id is numeric
    if (!is_numeric($id)) {
        return response()->json(['error' => 'Invalid ID'], 400);
    }

    $batches = Batch::where('created_by', $id)->get();

    return response()->json($batches);
}

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'grade' => 'nullable|string',
            'section' => 'nullable|string',
            'created_by' => 'required|integer',
        ]);

        $batch = Batch::create($request->all());
        return response()->json($batch, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'grade' => 'nullable|string',
            'section' => 'nullable|string',
            'created_by' => 'required|integer',
        ]);

        $batch = Batch::findOrFail($id);
        $batch->update($request->all());

        return response()->json($batch);
    }

    public function destroy($id)
    {
        $batch = Batch::findOrFail($id);
        $batch->delete();

        return response()->json(['message' => 'Deleted']);
    }
}

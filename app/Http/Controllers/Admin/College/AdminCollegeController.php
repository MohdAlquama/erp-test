<?php

namespace App\Http\Controllers\Admin\College;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\College;
use Illuminate\Support\Facades\Storage;

class AdminCollegeController extends Controller
{
    // Inertia page
    public function index()
    {
        return Inertia::render('admin/College/CollegeIndex');
    }

    // ✅ Fetch Colleges by admin
    public function list($adminId)
    {
        $colleges = College::where('admin_id', $adminId)
            ->get()
            ->map(function ($college) {
                return [
                    'id'        => $college->id,
                    'name'      => $college->name,
                    'location'  => $college->location,
                    'logo_url'  => $college->logo ? asset('storage/' . $college->logo) : null, // ✅ send full URL
                ];
            });

        return response()->json($colleges);
    }

    // ✅ Store College (one per admin logic)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'location'  => 'required|string|max:255',
            'admin_id'  => 'required|integer',
            'logo'      => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // ✅ validation
        ]);

        // If admin already has a college → update instead of insert
        $college = College::where('admin_id', $validated['admin_id'])->first();

        // Handle logo upload
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('colleges', 'public');
            $validated['logo'] = $path;
        }

        if ($college) {
            // delete old logo if replaced
            if ($request->hasFile('logo') && $college->logo) {
                Storage::disk('public')->delete($college->logo);
            }

            $college->update($validated);
            return response()->json([
                'message' => 'College already exists, so updated successfully',
                'college' => $college
            ], 200);
        }

        // Create new
        $college = College::create($validated);
        return response()->json([
            'message' => 'College created successfully',
            'college' => $college
        ], 201);
    }

    // ✅ Update College
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'location'  => 'required|string|max:255',
            'admin_id'  => 'required|integer',
            'logo'      => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $college = College::where('id', $id)
            ->where('admin_id', $validated['admin_id'])
            ->firstOrFail();

        // Handle logo upload
        if ($request->hasFile('logo')) {
            // delete old file if exists
            if ($college->logo) {
                Storage::disk('public')->delete($college->logo);
            }

            $path = $request->file('logo')->store('colleges', 'public');
            $validated['logo'] = $path;
        }

        $college->update($validated);

        return response()->json([
            'message' => 'College updated successfully',
            'college' => $college
        ]);
    }

    // ✅ Delete College
    public function destroy(Request $request, $id)
    {
        $request->validate([
            'admin_id' => 'required|integer'
        ]);

        $college = College::where('id', $id)
            ->where('admin_id', $request->admin_id)
            ->firstOrFail();

        // delete logo file if exists
        if ($college->logo) {
            Storage::disk('public')->delete($college->logo);
        }

        $college->delete();

        return response()->json(['message' => 'College deleted successfully']);
    }
}

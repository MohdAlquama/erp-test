<?php


namespace App\Http\Controllers\Super;

use App\Http\Controllers\Controller;
use App\Models\SubAdmin;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AddSubAdminController extends Controller
{
    public function index()
    {
      return Inertia::render('supperAdmin/AddSubAdmin');
    }

    public function store(Request $request)
    {
        try {
            Log::info('Add sub-admin request data:', ['data' => $request->all()]);

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:sub_admins,email',
                'password' => 'required|string|min:6',
                'phone' => 'nullable|string|max:20',
                'dob' => 'nullable|date',
                'ip' => 'nullable|ip',
                'address' => 'nullable|string',
                'role' => 'required|string|max:255',
                'permissions' => 'nullable|string|regex:/^(\.[a-zA-Z]+)*$/i',
                'status' => 'required|in:active,inactive',
            ]);

            $validated['password'] = Hash::make($validated['password']);

            SubAdmin::create($validated);

            return response()->json(['success' => 'Sub-Admin created successfully'], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error creating sub-admin', ['errors' => $e->errors(), 'request' => $request->all()]);
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Failed to create sub-admin', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['error' => 'Failed to create sub-admin: ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            Log::info('Update sub-admin request data:', ['id' => $id, 'data' => $request->all()]);

            $subAdmin = SubAdmin::findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:sub_admins,email,' . $id,
                'password' => 'nullable|string|min:6',
                'phone' => 'nullable|string|max:20',
                'dob' => 'nullable|date',
                'ip' => 'nullable|ip',
                'address' => 'nullable|string',
                'role' => 'required|string|max:255',
                'permissions' => 'nullable|string|regex:/^(\.[a-zA-Z]+)*$/i',
                'status' => 'required|in:active,inactive',
            ]);

            if (!empty($validated['password'])) {
                $validated['password'] = Hash::make($validated['password']);
            } else {
                unset($validated['password']);
            }

            $subAdmin->update($validated);

            return response()->json(['success' => 'Sub-Admin updated successfully'], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error updating sub-admin', ['id' => $id, 'errors' => $e->errors(), 'request' => $request->all()]);
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::error('Sub-admin not found', ['id' => $id]);
            return response()->json(['error' => 'Sub-admin not found'], 404);
        } catch (\Exception $e) {
            Log::error('Failed to update sub-admin', ['id' => $id, 'error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['error' => 'Failed to update sub-admin: ' . $e->getMessage()], 500);
        }
    }

    public function show()
    {
        try {
            $subAdmins = SubAdmin::select([
                'id',
                'name',
                'email',
                'phone',
                'dob',
                'ip',
                'address',
                'role',
                'permissions',
                'status' // ✅ Include status
            ])->get();

            return response()->json(['status' => 'success', 'data' => $subAdmins], 200);

        } catch (\Exception $e) {
            Log::error('Failed to fetch sub-admins', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['error' => 'Failed to fetch sub-admins: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $subAdmin = SubAdmin::findOrFail($id);
            $subAdmin->delete();

            return response()->json(['success' => 'Sub-Admin deleted successfully'], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::error('Sub-admin not found for deletion', ['id' => $id]);
            return response()->json(['error' => 'Sub-admin not found'], 404);
        } catch (\Exception $e) {
            Log::error('Failed to delete sub-admin', ['id' => $id, 'error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['error' => 'Failed to delete sub-admin: ' . $e->getMessage()], 500);
        }
    }
}

// namespace App\Http\Controllers\Super;
// use App\Http\Controllers\Controller;
// use App\Models\SubAdmin;
// use Illuminate\Support\Facades\Log;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Hash;
// use Inertia\Inertia;

// class AddSubAdminController extends Controller
// {
//     public function index()
//     {
//         return Inertia::render('supperAdmin/AddSubAdmin');
//     }

//     public function store(Request $request)
//     {
//         try {
//             Log::info('Add sub-admin request data:', ['data' => $request->all()]); // Debug
//             $validated = $request->validate([
//                 'name' => 'required|string|max:255',
//                 'email' => 'required|email|unique:sub_admins,email',
//                 'password' => 'required|string|min:6',
//                 'phone' => 'nullable|string|max:20',
//                 'dob' => 'nullable|date',
//                 'ip' => 'nullable|ip',
//                 'address' => 'nullable|string',
//                 'role' => 'required|string|max:255',
//                 'permissions' => 'nullable|string|regex:/^(\.[a-zA-Z]+)*$/i',
//                 'status' => 'required|in:active,inactive',
//             ]);
//             $validated['password'] = Hash::make($validated['password']);
//             SubAdmin::create($validated);
//             return response()->json(['success' => 'Sub-Admin created successfully'], 201);
//         } catch (\Illuminate\Validation\ValidationException $e) {
//             Log::error('Validation error creating sub-admin', ['errors' => $e->errors(), 'request' => $request->all()]);
//             return response()->json(['errors' => $e->errors()], 422);
//         } catch (\Exception $e) {
//             Log::error('Failed to create sub-admin', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
//             return response()->json(['error' => 'Failed to create sub-admin: ' . $e->getMessage()], 500);
//         }
//     }

//     public function update(Request $request, $id)
//     {
//         try {
//             Log::info('Update sub-admin request data:', ['id' => $id, 'data' => $request->all()]); // Debug
//             $subAdmin = SubAdmin::findOrFail($id);
//             $validated = $request->validate([
//                 'name' => 'required|string|max:255',
//                 'email' => 'required|email|unique:sub_admins,email,' . $id,
//                 'password' => 'nullable|string|min:6',
//                 'phone' => 'nullable|string|max:20',
//                 'dob' => 'nullable|date',
//                 'ip' => 'nullable|ip',
//                 'address' => 'nullable|string',
//                 'role' => 'required|string|max:255',
//                 'permissions' => 'nullable|string|regex:/^(\.[a-zA-Z]+)*$/i',
//             ]);
//             if (isset($validated['password']) && !empty($validated['password'])) {
//                 $validated['password'] = Hash::make($validated['password']);
//             } else {
//                 unset($validated['password']);
//             }
//             $subAdmin->update($validated);
//             return response()->json(['success' => 'Sub-Admin updated successfully'], 200);
//         } catch (\Illuminate\Validation\ValidationException $e) {
//             Log::error('Validation error updating sub-admin', ['id' => $id, 'errors' => $e->errors(), 'request' => $request->all()]);
//             return response()->json(['errors' => $e->errors()], 422);
//         } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
//             Log::error('Sub-admin not found', ['id' => $id]);
//             return response()->json(['error' => 'Sub-admin not found'], 404);
//         } catch (\Exception $e) {
//             Log::error('Failed to update sub-admin', ['id' => $id, 'error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
//             return response()->json(['error' => 'Failed to update sub-admin: ' . $e->getMessage()], 500);
//         }
//     }

//     public function show()
//     {
//         try {
//             $subAdmins = SubAdmin::select(['id', 'name', 'email', 'phone', 'dob', 'ip', 'address', 'role', 'permissions'])->get();
//             return response()->json(['status' => 'success', 'data' => $subAdmins], 200);
//         } catch (\Exception $e) {
//             Log::error('Failed to fetch sub-admins', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
//             return response()->json(['error' => 'Failed to fetch sub-admins: ' . $e->getMessage()], 500);
//         }
//     }

//     public function destroy($id)
//     {
//         try {
//             $subAdmin = SubAdmin::findOrFail($id);
//             $subAdmin->delete();
//             return response()->json(['success' => 'Sub-Admin deleted successfully'], 200);
//         } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
//             Log::error('Sub-admin not found for deletion', ['id' => $id]);
//             return response()->json(['error' => 'Sub-admin not found'], 404);
//         } catch (\Exception $e) {
//             Log::error('Failed to delete sub-admin', ['id' => $id, 'error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
//             return response()->json(['error' => 'Failed to delete sub-admin: ' . $e->getMessage()], 500);
//         }
//     }
// }
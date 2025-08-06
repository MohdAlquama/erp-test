<?php

namespace App\Http\Controllers\SubAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;
use App\Models\Token;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CreateAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('subadmin/createAdmin');
    }



    //to showing them with {id} 
     public function show($id)
    {
        $admins = Admin::where('sub_admin_id', $id)->get();
    return response()->json($admins);
    }
    
    //  create admin page
    public function create(Request $request)
    {
        // Validate form data
        $validator = Validator::make($request->all(), [
            'token' => 'required|string',
            'y' => 'required|exists:sub_admins,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email',
            'password' => 'required|string|min:6',
            'role' => 'required|string',
            'permissions' => 'required|array|min:1', // Ensure at least one permission
            'status' => 'required|in:Active,Inactive',
        ]);

        if ($validator->fails()) {
            Log::error('Validation failed', ['errors' => $validator->errors()]);
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        // Check token validity
        $tokenRecord = Token::where('sub_admin_id', $request->y)
            ->where('token', $request->token)
            ->first();

        if (!$tokenRecord) {
            Log::warning('Invalid token for sub_admin_id: ' . $request->y);
            return response()->json([
                'message' => 'Invalid or unauthorized token.',
            ], 403);
        }

        // Check token limit
        if ($tokenRecord->token_limit <= 0 || $tokenRecord->token_used >= $tokenRecord->token_limit) {
            Log::warning('Token limit reached for sub_admin_id: ' . $request->y);
            return response()->json([
                'message' => 'Token limit reached or invalid.',
            ], 403);
        }

        // Create Admin
        try {
            $admin = Admin::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
                'token' => $request->token,
                'permissions' => $request->permissions, // Array is automatically JSON-encoded
                'status' => $request->status,
                'sub_admin_id' => $request->y,
            ]);

            // Increment token_used
            $tokenRecord->increment('token_used');

            Log::info('Admin created successfully', ['admin_id' => $admin->id, 'sub_admin_id' => $request->y]);

            return response()->json([
                'message' => 'Admin created successfully.',
                'admin' => $admin,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Failed to create admin', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Failed to create admin. Please try again.',
            ], 500);
        }
    }

   
    public function update(Request $request, $id)
{
    // ✅ Step 1: Token check
    $tokenRecord = Token::where('sub_admin_id', $request->y)
                        ->where('token', $request->token)
                        ->first();

    if (!$tokenRecord) {
        return response()->json([
            'message' => 'Invalid or unauthorized token.',
        ], 403);
    }

    // ✅ Step 2: Validate input
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => "required|email|unique:admins,email,{$id}",
        'permissions' => 'required|array|min:1',
        'status' => 'required|in:Active,Inactive',
        'password' => 'nullable|string|min:6',
    ]);

    // ✅ Step 3: Fetch and update admin
    $admin = Admin::findOrFail($id);
    $admin->name = $request->name;
    $admin->email = $request->email;
    $admin->permissions = $request->permissions; // Array is automatically JSON-encoded
    $admin->status = $request->status;

    if ($request->filled('password')) {
        $admin->password = bcrypt($request->password);
    }

    $admin->save();

    return response()->json([
        'message' => 'Admin updated successfully.',
        'admin' => $admin,
    ]);
}


 public function updateDetail(Request $request, $id)
    {
        // Step 1: Token check
        $tokenRecord = Token::where('sub_admin_id', $request->y)
            ->where('token', $request->token)
            ->first();

        if (!$tokenRecord) {
            Log::warning('Invalid token for sub_admin_id: ' . $request->y);
            return response()->json([
                'message' => 'Invalid or unauthorized token.',
            ], 403);
        }

        // Step 2: Validate input
        $validator = Validator::make($request->all(), [
            'token' => 'required|string',
            'y' => 'required|exists:sub_admins,id',
            'name' => 'required|string|max:255',
            'email' => "required|email|unique:admins,email,{$id}",
            'permissions' => 'required|array|min:1',
            'status' => 'required|in:Active,Inactive',
        ]);

        if ($validator->fails()) {
            Log::error('Validation failed', ['errors' => $validator->errors()]);
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        // Step 3: Fetch and update admin
        try {
            $admin = Admin::findOrFail($id);
            $admin->name = $request->name;
            $admin->email = $request->email;
            $admin->permissions = $request->permissions; // Array is automatically JSON-encoded
            $admin->status = $request->status;

           

            $admin->save();

            Log::info('Admin updated successfully', ['admin_id' => $admin->id]);

            return response()->json([
                'message' => 'Admin updated successfully.',
                'admin' => $admin,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Failed to update admin', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Failed to update admin. Please try again.',
            ], 500);
        }
    }
}



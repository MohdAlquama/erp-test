<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\SubAdmin;
use App\Models\Token;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class TokenController extends Controller
{
    const REGEN_LIMIT = 3;
    const COOLDOWN_MS = 30000; // 30 seconds

    // Render the Token management view
    public function index()
    {
        $subAdmins = SubAdmin::select('id', 'name')->get();
        $tokens = Token::with('sub_admin:id,name')->get();

        return Inertia::render('supperAdmin/Token', [
            'subAdmins' => $subAdmins,
            'initialTokens' => $tokens, // Pass tokens for React component
        ]);
    }

    // API: Fetch all sub-admins
    public function fetchSubAdmins()
    {
        try {
            $subAdmins = SubAdmin::select('id', 'name')->get();
            return response()->json(['success' => true, 'data' => $subAdmins], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to fetch sub-admins'], 500);
        }
    }

    // API: Fetch all tokens
    public function getTokens()
    {
        try {
            $tokens = Token::with('sub_admin:id,name')->get();
            return response()->json(['success' => true, 'data' => $tokens], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to fetch tokens'], 500);
        }
    }

    // API: Create a new token
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required|string|unique:tokens,token|max:80',
            'sub_admin_id' => 'required|exists:sub_admins,id',
            'status' => 'required|in:Active,Expired',
            'token_limit' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()], 422);
        }

        try {
            $token = Token::create([
                'sub_admin_id' => $request->sub_admin_id,
                'token' => $request->token,
                'status' => $request->status,
                'token_limit' => $request->token_limit,
                'token_used' => 0,
                'regen_count' => 0,
            ]);

            return response()->json(['success' => true, 'data' => $token], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to create token'], 500);
        }
    }

    // API: Update an existing token
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required|string|unique:tokens,token,' . $id . '|max:80',
            'sub_admin_id' => 'required|exists:sub_admins,id',
            'status' => 'required|in:Active,Expired',
            'token_limit' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()], 422);
        }

        try {
            $token = Token::findOrFail($id);
            $token->update([
                'sub_admin_id' => $request->sub_admin_id,
                'token' => $request->token,
                'status' => $request->status,
                'token_limit' => $request->token_limit,
            ]);

            return response()->json(['success' => true, 'data' => $token], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to update token'], 500);
        }
    }

      
    // API: Delete a token
    public function destroy($id)
    {
        try {
            $token = Token::findOrFail($id);
            $token->delete();
            return response()->json(['success' => true, 'message' => 'Token deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to delete token'], 500);
        }
    }

    // API: Regenerate a token
    public function regenerate($id)
    {
        try {
            $token = Token::findOrFail($id);

            // Check regeneration limit
            if ($token->regen_count >= self::REGEN_LIMIT) {
                return response()->json(['success' => false, 'message' => 'Regeneration limit reached'], 403);
            }

            // Check cooldown
            if ($token->last_regen_at && Carbon::now()->diffInMilliseconds($token->last_regen_at) < self::COOLDOWN_MS) {
                return response()->json(['success' => false, 'message' => 'Cooldown period active'], 429);
            }

            // Generate new token
            $newToken = Str::upper(Str::random(8));
            $token->update([
                'token' => $newToken,
                'regen_count' => $token->regen_count + 1,
                'last_regen_at' => Carbon::now(),
            ]);

            return response()->json(['success' => true, 'data' => $token], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Regeneration failed'], 500);
        }
    }
}
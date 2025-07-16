<?php
namespace App\Http\Controllers;
use App\Models\SubAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SubAdminAuthController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('SubAdmin/Login');
    }

    public function showRegisterForm()
    {
        return Inertia::render('SubAdmin/Register');
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            if (Auth::guard('subadmin')->attempt($credentials)) {
                $request->session()->regenerate();
                $subAdmin = Auth::guard('subadmin')->user();
                Log::info('Sub-admin logged in', ['email' => $subAdmin->email, 'id' => $subAdmin->id]);
                return response()->json(['success' => 'Login successful', 'redirect' => route('supper.dashboard')]);
            }

            Log::warning('Sub-admin login failed', ['email' => $request->email]);
            return response()->json(['error' => 'Invalid credentials'], 401);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error during sub-admin login', ['errors' => $e->errors()]);
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Sub-admin login error', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Login failed: ' . $e->getMessage()], 500);
        }
    }

    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:sub_admins,email',
                'password' => 'required|string|min:6|confirmed',
                'role' => 'required|string|in:manager',
            ]);

            $subAdmin = SubAdmin::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => $validated['role'],
            ]);

            Auth::guard('subadmin')->login($subAdmin);
            $request->session()->regenerate();
            Log::info('Sub-admin registered and logged in', ['email' => $subAdmin->email, 'id' => $subAdmin->id]);

            return response()->json(['success' => 'Registration successful', 'redirect' => route('supper.dashboard')]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error during sub-admin registration', ['errors' => $e->errors()]);
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Sub-admin registration error', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Registration failed: ' . $e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $subAdmin = Auth::guard('subadmin')->user();
            Auth::guard('subadmin')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            Log::info('Sub-admin logged out', ['email' => $subAdmin?->email]);
            return response()->json(['success' => 'Logout successful', 'redirect' => route('subadmin.login')]);
        } catch (\Exception $e) {
            Log::error('Sub-admin logout error', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Logout failed: ' . $e->getMessage()], 500);
        }
    }
}
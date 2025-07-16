<?php

namespace App\Http\Controllers;

use App\Models\SubAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function show()
    {
        return Inertia::render('Auth/Login');
    }

    // public function login(Request $request)
    // {
    //     $credentials = $request->validate([
    //         'email' => 'required|email',
    //         'password' => 'required',
    //     ]);

    //     $subadmin = SubAdmin::where('email', $credentials['email'])->first();


    //     if ($subadmin && Hash::check($credentials['password'], $subadmin->password)) {
    //         $roles = array_map('strtolower', explode(',', $subadmin->role));

    //         $request->session()->put('subadmin', [
    //             'id' => $subadmin->id,
    //             'name' => $subadmin->name,
    //             'email' => $subadmin->email,
    //             'roles' => $roles,
    //         ]);

    //         return response()->json([
    //             'message' => 'Login successful',
    //             'user' => [
    //                 'id' => $subadmin->id,
    //                 'name' => $subadmin->name,
    //                 'email' => $subadmin->email,
    //                 'roles' => $roles,
    //                 'detail' => $subadmin->makeHidden(['password']), 
    //                 // 👈 Hide sensitive fields       
    //                          ]
    //         ]);
    //     }


    //     return back()->withErrors(['email' => 'Invalid email or password']);
    // }

    public function logout(Request $request)
    {
        $request->session()->forget('subadmin');
        return redirect('/login');
    }
    public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $subadmin = SubAdmin::where('email', $credentials['email'])->first();

    if (!$subadmin) {
        return back()->withErrors(['email' => 'User not found.']);
    }

    if (!Hash::check($credentials['password'], $subadmin->password)) {
        return back()->withErrors(['email' => 'Invalid password.']);
    }

    if ($subadmin->status !== 'active') {
        return back()->withErrors(['email' => 'Account is inactive. Contact administrator.']);
    }

    $roles = array_map('strtolower', explode(',', $subadmin->role ?? ''));
    $permissions = array_filter(explode('.', trim($subadmin->permissions ?? '')));

    $subadminSession = [
        'id' => $subadmin->id,
        'name' => $subadmin->name,
        'email' => $subadmin->email,
        'roles' => $roles,
        'phone' => $subadmin->phone,
        'dob' => $subadmin->dob,
        'ip' => $subadmin->ip,
        'address' => $subadmin->address,
        'permissions' => $permissions,
        'status' => $subadmin->status,
        'created_at' => $subadmin->created_at->toDateString(),
    ];

    $request->session()->put('subadmin', $subadminSession);

    return response()->json([
        'message' => 'Login successful',
        'user' => $subadminSession,
        'detail' => $subadmin->makeHidden(['password']),
    ]);



    
}




// update
    // public function login(Request $request)
    // {
    //     $credentials = $request->validate([
    //         'email' => 'required|email',
    //         'password' => 'required',
    //     ]);

    //     $subadmin = SubAdmin::where('email', $credentials['email'])->first();

    //     if ($subadmin && Hash::check($credentials['password'], $subadmin->password)) {
    //         $roles = array_map('strtolower', explode(',', $subadmin->role ?? ''));
    //         $permissions = array_filter(explode('.', trim($subadmin->permissions ?? '')));

    //         $subadminSession = [
    //             'id' => $subadmin->id,
    //             'name' => $subadmin->name,
    //             'email' => $subadmin->email,
    //             'roles' => $roles,
    //             'phone' => $subadmin->phone,
    //             'dob' => $subadmin->dob,
    //             'ip' => $subadmin->ip,
    //             'address' => $subadmin->address,
    //             'permissions' => $permissions,
    //             'status' => 'Active',
    //             'created_at' => $subadmin->created_at->toDateString(),
    //         ];

    //         $request->session()->put('subadmin', $subadminSession);

    //         return response()->json([
    //             'message' => 'Login successful',
    //             'user' => $subadminSession,
    //             'detail' => $subadmin->makeHidden(['password']),
    //         ]);
    //     }

    //     return back()->withErrors(['email' => 'Invalid email or password']);
    // }


    //     public function login(Request $request)
// {
//     $credentials = $request->validate([
//         'email' => 'required|email',
//         'password' => 'required',
//     ]);

    //     $subadmin = SubAdmin::where('email', $credentials['email'])->first();

    //     if ($subadmin && Hash::check($credentials['password'], $subadmin->password)) {
//         $roles = array_map('strtolower', explode(',', $subadmin->role));

    //         // Save only needed info to session
//         $request->session()->put('subadmin', [
//             'id' => $subadmin->id,
//             'name' => $subadmin->name,
//             'email' => $subadmin->email,
//             'roles' => $roles,
//             'phone' => $subadmin->phone,
//             'dob' => $subadmin->dob,
//             'ip' => $subadmin->ip,
//             'address' => $subadmin->address,
// 'permissions' => array_filter(explode('.', trim($subadmin->permissions ?? ''))),

    //             'status' => 'Active',
//             'created_at' => $subadmin->created_at->toDateString(),
//         ]);

    //         return response()->json([
//             'message' => 'Login successful',
//             'user' => session('subadmin'),
//             'detail'=>$subadmin            
//         ]);
//     }

    //     return back()->withErrors(['email' => 'Invalid email or password']);
// }

}




// if ($subadmin && Hash::check($credentials['password'], $subadmin->password)) {
//     $roles = array_map('strtolower', explode(',', $subadmin->role)); // ensure lowercase

//     // Store in session
//     $request->session()->put('subadmin', [
//         'id' => $subadmin->id,
//         'email' => $subadmin->email,
//         'roles' => $roles,
//     ]);

//     // Redirect based on role
//     if (in_array('superadmin', $roles)) {
//         return redirect()->route('supper.dashboard.index');
//     } elseif (in_array('user', $roles)) {
//         return Inertia::location(route('subadmin.dashboard.index'));
//     }

//     return redirect('/login'); // fallback
// }
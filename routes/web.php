<?php

use App\Http\Controllers\Admin\BatchesController;
use App\Http\Controllers\Admin\HelperController;
use App\Http\Controllers\Admin\TeacherController;

use App\Models\Admin;
use App\Models\Teachers;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Super\AddSubAdminController;
use App\Http\Controllers\Super\PermissionController;
use App\Http\Controllers\Super\SupperAdminDashboardController;
use App\Http\Controllers\SubAdminDashboardController;
 use App\Http\Controllers\superAdmin\TokenController;
 use App\Http\Controllers\subAdmin\createAdminController;
//  use App\Http\Controllers\Admin\SubjectController;
 use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\LoginController;
use Inertia\Inertia;
use Illuminate\Http\Request;
// ---------------- Simple Test POST Routes ----------------
Route::post('/ping', function () {
    return response()->json(['message' => 'pong']);
});

Route::post('/test-post', function () {
    return response()->json(['message' => 'CSRF bypassed']);
});

// ---------------- Authenticated Routes ----------------
Route::get('/', function () {
    return Inertia::render('Auth/collageLogin');
});
Route::post('/', [LoginController::class, 'collageLogin'])->name('collageLogin');


Route::get('/login', [LoginController::class, 'show'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.submit');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// ---------------- Authenticated Routes ----------------



// ---------------- Super Admin Routes ----------------
Route::prefix('supper')->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\SupperAdminDashboardController::class, 'index'])->name('supper.dashboard.index');
    Route::get('addsubadmin', [AddSubAdminController::class, 'index'])
        ->name('supper.addsubadmin.index'); // Inertia page
    Route::post('add-subadmin', [AddSubAdminController::class, 'store'])->name('supper.adduser.store');
    Route::put('update-subadmin/{id}', [AddSubAdminController::class, 'update'])->name('supper.update-subadmin');
    Route::get('fetch-subadmin', [AddSubAdminController::class, 'show'])->name('supper.subadmin.show');
    Route::get('permission', [PermissionController::class, 'index']); // Inertia page
    Route::post('permission', [PermissionController::class, 'store']);
    Route::get('permission-list', [PermissionController::class, 'fetch']);
    Route::put('permission/{id}', [PermissionController::class, 'update']);
    Route::delete('permission/{id}', [PermissionController::class, 'destroy']);
    Route::get('roles', [PermissionController::class, 'getRoles']);
    Route::delete('delete-subadmin/{id}', [AddSubAdminController::class, 'destroy'])->name('supper.delete-subadmin');
// ---------------- Token Routes ----------------
    Route::get('roles', [PermissionController::class, 'getRoles'])->name('supper.roles');
    Route::get('tokens-get', [TokenController::class, 'index'])->name('supper.tokens.index');
    Route::get('/fetch-subadmins', [TokenController::class, 'fetchSubAdmins']);
    Route::get('/tokens', [TokenController::class, 'getTokens']);
    Route::post('/tokens', [TokenController::class, 'store']);
    Route::put('/tokens/{id}', [TokenController::class, 'update']);
    Route::delete('/tokens/{id}', [TokenController::class, 'destroy']);
    Route::post('/tokens/{id}/regenerate', [TokenController::class, 'regenerate']);

 


// role route added


});


// ---------------- Sub Admin Routes ----------------
// Subadmin (user) routes
// // Subadmin (user) routes
// Route::prefix('subadmin')->middleware(['role:user'])->group(function () {
//     Route::get('dashboard', [SubAdminDashboardController::class, 'index'])->name('subadmin.dashboard.index');
//     Route::get('/createAdmin', [createAdminController::class, 'index']);
//     Route::post('/createAdmin', [createAdminController::class, 'create'])->name('subadmin.createAdmin');
// });

Route::prefix('subadmin')->middleware(['role:user'])->group(function () {
    Route::get('dashboard', [SubAdminDashboardController::class, 'index'])->name('subadmin.dashboard.index');
    Route::get('/createAdmin', [CreateAdminController::class, 'index']);

    //to fech admins with {id}
    Route::get('/admins/{id}', [CreateAdminController::class, 'show'])->name('subadmin.admins');

    // to created admin users here  
    Route::post('/createAdmin', [CreateAdminController::class, 'create'])->name('subadmin.createAdmin');
    // Update admin details
     Route::put('/admins/{id}', [CreateAdminController::class, 'update']);
    // Route::delete('/admins/{id}', [CreateAdminController::class, 'delete
});

 Route::get('/subadmin/{id}/permissions', [SubAdminDashboardController::class, 'getPermissions']);


// ---------------- CSRF Token Test Route ----------------
Route::get('/csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
});

Route::prefix('admin')->middleware(['newrole:CollegeAdmin'])->group(function () {

   // Admin Dashboard Page
    Route::get('/t', function (Request $request) {
        $admin = $request->session()->get('admin');

        return Inertia::render('t', [
            'admin' => $admin
        ]);
    });

    Route::get('/subjects', [SubjectController::class, 'index'])->name('admin.subjects.index');
    Route::post('/subjects', [SubjectController::class, 'store'])->name('admin.subjects.store');
    Route::get('{id}/subjects', [SubjectController::class, 'get'])->name('admin.subjects.get');
    // Permissions Route for Admin by ID
    Route::get('/{id}/permissions', function ($id) {
        $admin = Admin::findOrFail($id);
        return response()->json([
            'permissions' => $admin->permissions,
        ]);
    })->name('admin.permissions');

    // ✅ Batch route with correct method
    Route::get('/batch', [BatchesController::class, 'indexs'])->name('admin.batch.index');

      Route::get('/{id}/batches', [BatchesController::class, 'index']);
    Route::post('/batches', [BatchesController::class, 'store']);
    Route::put('/batches/{id}', [BatchesController::class, 'update']);
    Route::delete('/batches/{id}', [BatchesController::class, 'destroy']);
//     Route::get('/teachers',function(){
// return Inertia::render('admin/SubjectAssign');

//     });




    Route::get('/TeacherDrawer', function(){
        return Inertia::render('admin/TeacherDrawer');
    })->name('admin.teachers.index');
 
 Route::post('{id}/teachers', function (Request $request, $adminId) {
    $data = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'nullable|email',
        'password' => 'required|string|',
        'status' => 'required|in:Active,Inactive',
        'batch_ids' => 'nullable|array',
        'subject_ids' => 'nullable|array',

    ]);
        $data['admin_id'] = $adminId;
            $data['role'] = 'Teacher'; // 👈 Assign role here

    
    $teacher = Teachers::create($data);

    return response()->json([
        'message' => 'Teacher added successfully',
        'teacher' => $teacher
    ], 201);
})->name('admin.teachers.store');
Route::get('{id}/teachers', function ($adminId) {
    $teachers = Teachers::where('admin_id', $adminId)->get();

    return response()->json([
        'teachers' => $teachers
    ]);
})->name('admin.teachers.index');

Route::put('{id}/teachers/{teacherId}', function (Request $request, $adminId, $teacherId) {
    $data = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'nullable|email',
        'status' => 'required|in:Active,Inactive',
        'batch_ids' => 'nullable|array',
        'subject_ids' => 'nullable|array',
    ]);

    $teacher = Teachers::where('admin_id', $adminId)->findOrFail($teacherId);
    $teacher->update($data);

    return response()->json([
        'message' => 'Teacher updated successfully',
        'teacher' => $teacher
    ]);
})->name('admin.teachers.update');

Route::delete('{id}/teachers/{teacherId}', function ($adminId, $teacherId) {
    $teacher = Teachers::where('admin_id', $adminId)->findOrFail($teacherId);
    $teacher->delete();

    return response()->json([
        'message' => 'Teacher deleted successfully'
    ]);
})->name('admin.teachers.destroy');


Route::get('/teachers/{id}/count', [HelperController::class, 'index'])->name('admin.helper.index');
    



});


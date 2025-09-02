<?php

use App\Http\Controllers\Admin\AdminCardController;
use App\Http\Controllers\Admin\Admit\AdmitCardFolderController;
use App\Http\Controllers\Admin\Admit\AdmitCardIssuesController;
use App\Http\Controllers\Admin\Admit\BatchFolderController;
use App\Http\Controllers\Admin\Admit\ResultController;
use App\Http\Controllers\Admin\AdmitCardController;
use App\Http\Controllers\Admin\BatchesController;
use App\Http\Controllers\Admin\BatchViewController;
use App\Http\Controllers\Admin\ClassRoomController;
use App\Http\Controllers\Admin\HelperController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\Syllbus\SyllbusController;
use App\Http\Controllers\Admin\TeacherController;

use App\Http\Controllers\Student\StudentAdmitCardController;
use App\Http\Controllers\Student\StudentAttendanceController;
use App\Http\Controllers\Student\StudentCourseController;
use App\Http\Controllers\Student\StudentDashboardController;
use App\Http\Controllers\Student\StudentGradeController;
use App\Http\Controllers\Student\StudentNotificationController;
use App\Http\Controllers\Student\StudentProfileController;
use App\Http\Controllers\Student\StudentResultController;
use App\Http\Controllers\Student\StudentSyllbusController;
use App\Http\Controllers\Teacher\AddentanceController;
use App\Http\Controllers\Teacher\TeacherBatchController;
use App\Models\Admin;
use App\Models\Teachers;
use GuzzleHttp\Middleware;
use Illuminate\Routing\Router;
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
// getInertia of teacher Controller

Route::get('/teacher', [TeacherController::class, 'getInertia']);


Route::post('/teacher/login', [TeacherController::class, 'login']);


// ---------------- Authenticated Routes ----------------
Route::get('/admin', function () {
    return Inertia::render('Auth/collageLogin');
});
Route::post('/admin', [LoginController::class, 'collageLogin'])->name('collageLogin');


Route::get('/login', [LoginController::class, 'show'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.submit');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');


// ---------------- Student Routes ----------------

Route::get('/', [StudentController::class, 'getLoginPage'])->name('student.login');
Route::post('/student-login', [StudentController::class, 'getLoginDetailsCheck'])->name('student.login.submit');
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
    Route::get('/{adminId}/batch/{batchId}/teachers', [BatchViewController::class, 'index']);
    Route::post('/{admin_id}/batch/{batch_id}/assign-subject', [BatchViewController::class, 'assignSubject']);
    Route::get('/{adminId}/batch/{batchId}/assignments', [BatchViewController::class, 'getAssignments']);
    Route::delete('/{adminId}/batch/{batchId}/assignments/{assignmentId}', [BatchViewController::class, 'deleteAssignment']);
    Route::put('/{adminId}/batch/{batchId}/assignments/{assignmentId}', [BatchViewController::class, 'editAssignment']);
    Route::delete('/{adminId}/batch/{batchId}/teachers/{teacherId}', [BatchViewController::class, 'removeTeacherFromBatch']);

    // Admin Dashboard Page
    Route::get('/t', function (Request $request) {
        $admin = $request->session()->get('admin');

        return Inertia::render('admin/AdminDashboard', [
            'admin' => $admin
        ]);
    });

    Route::get('/subjects', [SubjectController::class, 'index'])->name('admin.subjects.index');
    Route::post('/subjects', [SubjectController::class, 'store'])->name('admin.subjects.store');
    Route::get('{id}/subjects', [SubjectController::class, 'get'])->name('admin.subjects.get');

    Route::put('/subjects/{id}', [SubjectController::class, 'update'])->name('admin.subjects.update');
    Route::delete('/subjects/{id}', [SubjectController::class, 'destroy'])->name('admin.subjects.destroy');
    // Permissions Route for Admin by ID
    Route::get('/{id}/permissions', function ($id) {
        $admin = Admin::findOrFail($id);
        return response()->json([
            'permissions' => $admin->permissions,
        ]);
    })->name('admin.permissions');

    // ✅ Batch route with correct method
    Route::get('/batch', [BatchesController::class, 'indexs'])->name('admin.batch.index');
    //problem 
    Route::get('/{id}/batches', [BatchesController::class, 'index']);
    Route::get('/batches/{id}', [BatchesController::class, 'show'])
        ->name('admin.batches.show');
    Route::post('/batches', [BatchesController::class, 'store']);
    //probem
    Route::put('/batches/{id}', [BatchesController::class, 'update']);
    Route::delete('/batches/{id}', [BatchesController::class, 'destroy']);
    //     Route::get('/teachers',function(){
// return Inertia::render('admin/SubjectAssign');

    //     });




    Route::get('/TeacherDrawer', function () {
        return Inertia::render('admin/TeacherDrawer');
    })->name('admin.teachers.index');





    Route::post('{id}/teachers', function (Request $request, $adminId) {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email',
            'password' => 'required|string|',
            'status' => 'required|in:Active,Inactive',
            'batch_ids' => 'nullable|array',

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


    Route::get('/students', function () {
        return Inertia::render('admin/StudentManagement');
    })->name('admin.students.index');

    Route::post('/student', [StudentController::class, 'store']);
    Route::delete('/{adminId}/students/{studentId}', [StudentController::class, 'destroy']);

    Route::put('/students/{student}', [StudentController::class, 'update']);
    Route::get('/{adminId}/students', [StudentController::class, 'getByAdmin']);
    Route::get('/classRoomController', [ClassRoomController::class, 'index']);
    Route::post("/{id}/class-room", [ClassRoomController::class, 'store'])->name('classroom.store');
    Route::get('/{adminId}/class-rooms', [ClassRoomController::class, 'getRoomsByAdmin'])->name('classroom.getByAdmin');
    Route::put('{adminId}/class-room/{roomId}', [ClassRoomController::class, 'update']);
    Route::delete('/{adminId}/class-room/{roomId}', [ClassRoomController::class, 'destroy']);
    Route::get('admin-card', [AdminCardController::class, 'index']);
    Route::post('/{id}/admin-cards', [AdminCardController::class, 'store']);
    Route::get('/{id}/admin-cards', [AdminCardController::class, 'getData']);
    Route::put('/{adminId}/admin-cards/{cardId}/inactivate', [AdminCardController::class, 'inactivate']);
    Route::put('/{adminId}/admin-cards/{cardId}/activate', [AdminCardController::class, 'activate']);
    Route::delete('/{adminId}/admin-cards/{cardId}', [AdminCardController::class, 'destroy']);
    Route::get('/{adminId}/admin-cards/student/{studentId}', [AdminCardController::class, 'getActiveStudentData']);
    Route::get('admit-card-info-add', [AdmitCardController::class, 'index']);
    Route::post('/admit-card', [AdmitCardController::class, 'store']);
    Route::get('/admit-card/{adminId}', [AdmitCardController::class, 'indexs']);
    Route::put('/admit-card/{id}', [AdmitCardController::class, 'update']); // Update
    Route::delete('/admit-card/{id}', [AdmitCardController::class, 'destroy']); // Delete

    //new admit desgin router 
    //admit card folder
    Route::get('/{id}/admit-card-folders', [AdmitCardFolderController::class, 'indexs']);
    Route::get('/admit-card-folder', [AdmitCardFolderController::class, 'index']);
    Route::post('/{adminId}/admit-card-folder', [AdmitCardFolderController::class, 'store']);
    Route::put('/{adminId}/admit-card-folder/{id}', [AdmitCardFolderController::class, 'update']);
    Route::delete('/{adminId}/admit-card-folder/{id}', [AdmitCardFolderController::class, 'destroy']);
    Route::get('/admit-card-folder/{id}', [AdmitCardFolderController::class, 'getIenertiaParamShow'])
        ->name('admin.admit-card-folder.getIenertiaParamShow');
    Route::get('/{id}/AdminGetBatch', [BatchesController::class, 'AdminGetBatch']);
    Route::post('/save-batch-folder', [BatchFolderController::class, 'store']);
    Route::get('/admin-folder-data', [BatchFolderController::class, 'getAdminFolderData']);
    Route::delete('/delete-batch-folder/{id}', [BatchFolderController::class, 'destroy']);
    Route::post('/get-batches-by-ids', [BatchFolderController::class, 'getBatchesByIds']);
    //subject desgin by admit cart
    Route::get('/getIenertiaParamShowOfSubject/{id}/{folder_id}/{admin_id}', [BatchFolderController::class, 'getIenertiaParamShowOfSubject']);
    // admit card sumbit them
    Route::post('/{admin}/admit-card/submit', [AdmitCardIssuesController::class, 'store']);
    Route::get('/{admin_id}/admit-cards/{folder_id}/{batch_id}', [AdmitCardIssuesController::class, 'getData']);
    Route::delete('/{admin_id}/admit-card/{id}', [AdmitCardIssuesController::class, 'destroy']);
    //result
Route::post('/{admin_id}/results', [ResultController::class, 'store']);
Route::get('/{admin_id}/results/{folder_id}/{batch_id}', [ResultController::class, 'index']);
Route::delete('/results/{adminId}/{enrollment}', [ResultController::class, 'destroy']);
Route::put('/results/approve', [ResultController::class, 'approveAll']);
//syllbus

Route::get('/syllbus',[SyllbusController::class,'index']);
Route::get('/{adminId}/syllabus',[SyllbusController::class,'show']);
Route::post('/{adminId}/syllabus', [SyllbusController::class, 'store']);
    Route::post('/{adminId}/syllabus/{id}', [SyllbusController::class, 'update']); // or PUT
Route::delete('/{adminId}/syllabus/{id}', [SyllbusController::class, 'destroy']);
//permissions
Route::get('/permissions', [\App\Http\Controllers\Admin\AdminPermissionsController::class, 'index'])->name('admin.permissions.index');

//dashboard
Route::get('/{adminId}/active-teachers-count', [\App\Http\Controllers\Admin\Dashbooard\AdminDashbordController::class, 'FindTeacherActive'])->name('admin.dashboard');
Route::get('/{adminId}/inactive-teachers-count', [\App\Http\Controllers\Admin\Dashbooard\AdminDashbordController::class, 'FindTeacherInactive'])->name('admin.dashboard.inactive');
Route::get('/{adminId}/total-teachers-count', [\App\Http\Controllers\Admin\Dashbooard\AdminDashbordController::class, 'FindTeacherTotal'])->name('admin.dashboard.total');
Route::get('/{adminId}/total-students-count', [\App\Http\Controllers\Admin\Dashbooard\AdminDashbordController::class, 'FindStudentTotal'])->name('admin.dashboard.studenttotal');
Route::get('/{adminId}/active-students-count', [\App\Http\Controllers\Admin\Dashbooard\AdminDashbordController::class, 'FindStudentActive'])->name('admin.dashboard.studentactive');
Route::get('/{adminId}/inactive-students-count', [\App\Http\Controllers\Admin\Dashbooard\AdminDashbordController::class, 'FindStudentInactive'])->name('admin.dashboard.studentinactive');
Route::get('/{adminId}/totalBatch', [\App\Http\Controllers\Admin\Dashbooard\AdminDashbordController::class, 'GetTotalBatches'])->name('admin.dashboard.batches');
Route::get('/{adminId}/totalClassRooms', [\App\Http\Controllers\Admin\Dashbooard\AdminDashbordController::class, 'GetTotalClassRooms'])->name('admin.dashboard.classrooms');
Route::get('/{adminId}/totalAtmitCard', [\App\Http\Controllers\Admin\Dashbooard\AdminDashbordController::class, 'GetTotalAmitCardDesgin'])->name('admin.dashboard.totalAtmitCard');
Route::get('/{adminId}/totalPresentToday', [\App\Http\Controllers\Admin\Dashbooard\AdminDashbordController::class, 'presentToday'])->name('admin.dashboard.presentToday');
Route::get('/{adminId}/totalAbsentToday', [\App\Http\Controllers\Admin\Dashbooard\AdminDashbordController::class, 'absentToday'])->name('admin.dashboard.absentToday');
/** not use them */    Route::get('/{adminId}/today', [\App\Http\Controllers\Admin\Dashbooard\AdminDashbordController::class, 'today']);
    Route::get('/{adminId}/monthly', [\App\Http\Controllers\Admin\Dashbooard\AdminDashbordController::class, 'monthly']);
    Route::get('/{adminId}/yearly', [\App\Http\Controllers\Admin\Dashbooard\AdminDashbordController::class, 'yearly']);
    Route::get('/{adminId}/attendance', [\App\Http\Controllers\Admin\Dashbooard\AdminDashbordController::class, 'getAdminAttendance']);
    Route::get('/attendance-chart', [\App\Http\Controllers\Admin\Dashbooard\AdminDashbordController::class, 'AttendaceInertia']);
    //college
        Route::get('/college', [\App\Http\Controllers\Admin\College\AdminCollegeController::class, 'index']);

    // API endpoints
    Route::get('{adminId}/colleges', [\App\Http\Controllers\Admin\College\AdminCollegeController::class, 'list']); // fetch colleges by admin
    Route::post('colleges', [\App\Http\Controllers\Admin\College\AdminCollegeController::class, 'store']);
    Route::put('colleges/{id}', [\App\Http\Controllers\Admin\College\AdminCollegeController::class, 'update']);
    Route::delete('colleges/{id}', [\App\Http\Controllers\Admin\College\AdminCollegeController::class, 'destroy']);

});



// Student routes
Route::prefix('student')->middleware('student.session')->group(function () {
    //logout
    Route::post('/student/logout', [StudentDashboardController::class, 'logout'])->name('student.logout');
    Route::get('/dashboard', [StudentDashboardController::class, 'index'])->name('student.dashboard.index');
    Route::get('/mycourses', [StudentCourseController::class, 'index']);
    Route::get('MyCourses/{batch_id}/{admin_id}', [StudentCourseController::class, 'MyCourses']);
    Route::get('/admitCard', [StudentAdmitCardController::class, 'index']);
    Route::get('/admit-card-folders', [StudentAdmitCardController::class, 'getFolders']);
    Route::get('/admit-card', [StudentAdmitCardController::class, 'show']);
    Route::get('/layout/{id}/{admin_id}', [StudentAdmitCardController::class, 'layout']);
    //Attendance routes
    Route::get('/get-attendance/{student_EndrollmentNumber}/{admin_id}', [StudentAttendanceController::class, 'getAttendance']);
    Route::get('/attendance', [StudentAttendanceController::class, 'index']);
    //result
    Route::get('/my-result', [StudentResultController::class, 'index']);
    Route::get('/result/{adminId}/{folderName}/{batchId}/{enrollmentNumber}', [StudentResultController::class, 'getStudentResults']);
    //syllbus
    Route::get('/syllabus',[StudentSyllbusController::class,'index']);
    Route::get('/syllabus/{adminId}/{batchId}',[StudentSyllbusController::class,'show']);
    //Icard
    Route::get('/icard', [\App\Http\Controllers\Student\StudentIcardController::class, 'index']);
        Route::get('{adminId}/colleges', [\App\Http\Controllers\Admin\College\AdminCollegeController::class, 'list']); // fetch colleges by admin
        //batch
        Route::get('{adminId}/batches/{id}', [BatchesController::class, 'StudentGetBatch']);

});






Route::prefix('teacher')->middleware(['teacher'])->group(function () {
    Route::get('/addentance', [AddentanceController::class, 'index']);
    Route::get('/dashboard', function () {
        return inertia('teacher/TeacherDashboard', [
            'teacher' => Session::get('teacher')
        ]);
    });
    Route::get('/{id}/batches', [BatchesController::class, 'index']);

    Route::get('/{id}', function ($id) {
        $teacher = Teachers::findOrFail($id);
        return response()->json($teacher);
    });
    Route::get('/students/admin/{adminId}/batch/{batchId}', [AddentanceController::class, 'getStudentsByAdminAndBatch']);

    Route::post('/attendance', [AddentanceController::class, 'store']);
    Route::get('/attendance/filter', [AddentanceController::class, 'getAttendanceByFilters']);
    Route::put('/attendance', [AddentanceController::class, 'update']);
    Route::get('/attendance/all/{teacher_id}/{admin_id}', action: [AddentanceController::class, 'getByTeacherOrAdmin']);
    // new router will desgin them 
    Route::get('/admin/{adminId}/batches', [TeacherBatchController::class, 'getBatchesByAdmin']);
    /**
     * Get subjects assigned to a teacher in a specific batch.
     */
    Route::post('/subjects', [TeacherBatchController::class, 'getSubjects']);

     /**
     * Get teacher's related subject, batch, and students
     */
    Route::post('/subject/details', [TeacherBatchController::class, 'getTeacherSubjectDetails']);
    /** it sumit them attendance */
    Route::post('/attendance', [AddentanceController::class, 'SaveAttendance']); // save single row
    Route::post('/attendance/check', [AddentanceController::class, 'checkAttendance']);

    /**
     * Display a list of attendances filtered by admin, teacher, and batch creator.
     */

    Route::get('/attendances/{adminId}/{teacherId}', [AddentanceController::class, 'indexing']);
});


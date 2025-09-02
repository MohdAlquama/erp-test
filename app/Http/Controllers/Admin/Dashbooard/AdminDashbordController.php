<?php

namespace App\Http\Controllers\Admin\Dashbooard;

use App\Http\Controllers\Controller;
use App\Models\admit_cards;
use App\Models\Batch;
use App\Models\ClassRoom;
use App\Models\Student;
use App\Models\Teachers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminDashbordController extends Controller
{

    public function FindTeacherTotal($adminId)
    {
        $totalTeachersCount = Teachers::where('admin_id', $adminId)->count();
        return response()->json([
            'totalTeachersCount' => $totalTeachersCount
        ]);
    }
     public function FindTeacherActive($adminId)
    {
        $activeTeachersCount = Teachers::where('admin_id', $adminId)
            ->where('status', 'Active')
            ->count();

        return response()->json([
            'activeTeachersCount' => $activeTeachersCount
        ]);
    }
    public function FindTeacherInactive($adminId)
    {
        $inactiveTeachersCount = Teachers::where('admin_id', $adminId)
            ->where('status', 'Inactive')
            ->count();

        return response()->json([
            'inactiveTeachersCount' => $inactiveTeachersCount
        ]);
    }

    public function FindStudentTotal($adminId)
    {
        $totalStudentsCount = Student::where('admin_id', $adminId)->count();
        return response()->json([
            'totalStudentsCount' => $totalStudentsCount
        ]);
    }
    public  function FindStudentActive($adminId)
    {
        $activeStudentsCount = Student::where('admin_id', $adminId)
            ->where('status', 'Active')
            ->count();

        return response()->json([
            'activeStudentsCount' => $activeStudentsCount
        ]);
    }
    public function FindStudentInactive($adminId)
    {
        $inactiveStudentsCount = Student::where('admin_id', $adminId)
            ->where('status', 'Inactive')
            ->count();
        return response()->json([
            'inactiveStudentsCount' => $inactiveStudentsCount
        ]); 
    }

    public function GetTotalBatches($adminId)
    {
        $totalBatches = Batch::where('created_by', $adminId)->count();
        return response()->json([
            'totalBatches' => $totalBatches
        ]);
    }
    public function GetTotalClassRooms($adminId)
    {
        $totalExamRomm = ClassRoom::where('admin_id', $adminId)->count();
        return response()->json([
            'totalExamRomm' => $totalExamRomm
        ]);
    }
    public function GetTotalAmitCardDesgin($adminId){
           $totalAtmitCard= admit_cards::where('admin_id',$adminId)->count();
              return response()->json([
                'totalAtmitCard' => $totalAtmitCard
              ]);
    }
    public function presentToday($adminId)
{
    $today = now()->toDateString();

    $presentCount = DB::table('attendances')
        ->where('admin_id', $adminId)
        ->whereDate('date', $today)
        ->where('status', 'present')
        ->count();

    return response()->json([
        'totalPresentToday' => $presentCount
    ]);
}
public function absentToday($adminId)
{
    $today = now()->toDateString();

    $absentCount = DB::table('attendances')
        ->where('admin_id', $adminId)
        ->whereDate('date', $today)
        ->where('status', 'absent')
        ->count();

    return response()->json([
        'totalAbsentToday' => $absentCount
    ]);

    }
     // ✅ Today’s attendance
    public function today($adminId)
    {
        $today = now()->toDateString();

        $present = DB::table('attendances')
            ->where('admin_id', $adminId)
            ->whereDate('date', $today)
            ->where('status', 'present')
            ->count();

        $absent = DB::table('attendances')
            ->where('admin_id', $adminId)
            ->whereDate('date', $today)
            ->where('status', 'absent')
            ->count();

        return response()->json([
            'present' => $present,
            'absent' => $absent,
        ]);
    }

    // ✅ Monthly attendance (current month by day)
    public function monthly($adminId)
    {
        $month = now()->month;
        $year = now()->year;

        $data = DB::table('attendances')
            ->selectRaw('DATE(date) as day,
                         SUM(CASE WHEN status="present" THEN 1 ELSE 0 END) as present,
                         SUM(CASE WHEN status="absent" THEN 1 ELSE 0 END) as absent')
            ->where('admin_id', $adminId)
            ->whereYear('date', $year)
            ->whereMonth('date', $month)
            ->groupBy('day')
            ->orderBy('day')
            ->get();

        return response()->json($data);
    }

    // ✅ Yearly attendance (per month)
    public function yearly($adminId)
    {
        $year = now()->year;

        $data = DB::table('attendances')
            ->selectRaw('MONTH(date) as month,
                         SUM(CASE WHEN status="present" THEN 1 ELSE 0 END) as present,
                         SUM(CASE WHEN status="absent" THEN 1 ELSE 0 END) as absent')
            ->where('admin_id', $adminId)
            ->whereYear('date', $year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json($data);
    }

    public function getAdminAttendance($adminId)
{
    $attendanceData = DB::table('attendances as a')
        ->join('students as s', function ($join) {
            $join->on('s.enrollment_number', '=', 'a.student_enrollment_number')
                 ->on('s.admin_id', '=', 'a.admin_id');
        })
        ->join('batches as b', function ($join) {
            $join->on('b.id', '=', 'a.batch_id')
                 ->on('b.created_by', '=', 'a.admin_id');
        })
        ->join('teachers as t', 't.id', '=', 'a.teacher_id')
        ->join('subjects as sub', function ($join) {
            $join->on('sub.id', '=', 'a.subject_id')
                 ->on('sub.created_by', '=', 'a.admin_id');
        })
        ->where('a.admin_id', $adminId)   // ✅ filter by admin id only
        ->select(
            'a.id as attendance_id',
            'a.date',
            'a.status',
            's.name as student_name',
            's.enrollment_number',
            'b.name as batch_name',
            'b.grade',
            'b.section',
            'sub.subject as subject_name',
            't.name as teacher_name',
            't.email as teacher_email'
        )
        ->orderBy('a.date', 'desc')
        ->get();

    return response()->json($attendanceData);
}

public function AttendaceInertia()
    {
        return Inertia::render('admin/attendance/AttendanceChart');
    }

}

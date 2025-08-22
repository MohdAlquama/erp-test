<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\admit_card_folders;
use App\Models\admit_cards;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
class StudentAdmitCardController extends Controller
{
    public function index(){
        return Inertia::render('student/AdmitCard');
    }


    // Fetch folders by admin_id and year
    public function getFolders(Request $request)
    {
        // Validate input
        $request->validate([
            'admin_id' => 'required|integer|exists:admins,id',
            'year' => 'required|integer',
        ]);

        $adminId = $request->admin_id;
        $year = $request->year;

        // Fetch data
        $folders = admit_card_folders::where('admin_id', $adminId)
            ->where('year', $year)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $folders
        ]);
    }
    public function show(Request $request)
    {
        $studentEnrollment = $request->input('enrollment_number'); // e.g., 2100103241
        $batchId = $request->input('batch_id'); // e.g., 15
        $adminId = $request->input('admin_id'); // e.g., 8
        $folderName = $request->input('folder_id');

        $admitCard = DB::table('admit_card_folders as acf')
            ->join('admit_cards as ac', 'ac.id', '=', 'acf.exam_type_id')
            ->join('admit_card_issues as aci', 'aci.folder_id', '=', 'acf.id')
            ->join('students as s', 's.enrollment_number', '=', 'aci.enrollment_number')
            ->select(
                'acf.folder_name',
                'acf.year',
                'acf.exam_type_id',
                'ac.exam_type',
                'ac.session_of_exam',
                'ac.college_name',
                'ac.college_logo_url',
                'ac.sign_url',
                'ac.general_instructions',
                'ac.notices',
                's.name as student_name',
                's.profile_image',
                's.father_name',
                's.session as student_session',
                's.enrollment_number',
                's.contact_number',
                's.gender',
                's.dob',
                's.batch_ids as students_batch_id',
                'aci.subject_name',
                'aci.batch_name',
                'aci.batch_id',
                'aci.teacher_name',
                'aci.exam_venue',
                'aci.exam_date',
                'aci.exam_time'
            )
            ->where('acf.admin_id', $adminId)
            ->where('acf.folder_name', $folderName)
            ->whereRaw('s.session = CAST(acf.year AS CHAR)')
            ->where('aci.enrollment_number', $studentEnrollment)
            ->where('s.batch_ids', $batchId)
            ->get();

        if ($admitCard->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No admit card found for this student.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $admitCard
        ]);
    }

    public function layout($id,$admin_id){
        $layout = admit_cards::where('id',$id)->where('admin_id',$admin_id)->get();
        return response()->json([
             'success' => true,
            'data' => $layout
        ]);

    }
}



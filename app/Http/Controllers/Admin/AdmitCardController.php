<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\admit_cards;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;



class AdmitCardController extends Controller
{


    



    public function index(){
        return Inertia::render('admin/AdmitCard');
    }

    public function getStudent(){
        return Inertia::render('student/AdmitCard');
    }
public function folder(){
        
    }














      public function store(Request $request)
    {
        $request->validate([
            'admin' => 'required|', // Ensure it's a valid user ID
            'collegeName' => 'required|string|max:255',
            'examType' => 'required|string|max:255',
            'sessionOfExam' => 'required|string|max:255',
            'collegeLogo' => 'required|image|max:2048',
            'sign' => 'required|image|max:2048',
            'generalInstructions' => 'nullable|json',
            'notices' => 'nullable|json',
        ]);

        // Assuming you have admin auth, get admin id

        // Store images to 'public/admit_cards' folder
        $collegeLogoPath = $request->file('collegeLogo')->store('admit_cards/logos', 'public');
        $signPath = $request->file('sign')->store('admit_cards/signs', 'public');

        // Save record
        $admitCard = admit_cards::create([
           'admin_id' => $request->admin,
            'college_name' => $request->collegeName,
            'exam_type' => $request->examType,
            'session_of_exam' => $request->sessionOfExam,
            'college_logo_url' => Storage::url($collegeLogoPath),  // generates URL to file
            'sign_url' => Storage::url($signPath),
            'general_instructions' => $request->generalInstructions ? json_decode($request->generalInstructions, true) : null,
            'notices' => $request->notices ? json_decode($request->notices, true) : null,
        ]);

        return response()->json(['message' => 'Admit card saved successfully', 'data' => $admitCard], 201);
    }
    // Fetch admit cards by admin ID
    public function indexs($adminId)
    {
        try {
            $admitCards = admit_cards::where('admin_id', $adminId)->get();
            return response()->json(['admitCards' => $admitCards], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch admit cards: ' . $e->getMessage()], 500);
}
    }
    // Update an admit card (Update)
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'admin' => 'required|',
            'collegeName' => 'required|string|max:255',
            'examType' => 'required|string|max:255',
            'sessionOfExam' => 'required|string|max:255',
            'collegeLogo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'sign' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'generalInstructions' => 'required|json',
            'notices' => 'required|json',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        try {
            $admitCard = admit_cards::where('id', $id)->where('admin_id', $request->admin)->firstOrFail();

            // Update images if provided
            $data = [
                'college_name' => $request->collegeName,
                'exam_type' => $request->examType,
                'session_of_exam' => $request->sessionOfExam,
                'general_instructions' => json_decode($request->generalInstructions, true),
                'notices' => json_decode($request->notices, true),
            ];

            if ($request->hasFile('collegeLogo')) {
                // Delete old logo if exists
                if ($admitCard->college_logo_url) {
                    Storage::disk('public')->delete($admitCard->college_logo_url);
                }
                $data['college_logo_url'] = $request->file('collegeLogo')->store('admit_cards/logos', 'public');
            }

            if ($request->hasFile('sign')) {
                // Delete old sign if exists
                if ($admitCard->sign_url) {
                    Storage::disk('public')->delete($admitCard->sign_url);
                }
                $data['sign_url'] = $request->file('sign')->store('admit_cards/signs', 'public');
            }

            $admitCard->update($data);

            return response()->json(['message' => 'Admit card updated successfully', 'data' => $admitCard], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update admit card: ' . $e->getMessage()], 500);
        }
    }

    // Delete an admit card (Delete)
    public function destroy($id)
    {
        try {
            $admitCard = admit_cards::findOrFail($id);

            // Delete associated images
            if ($admitCard->college_logo_url) {
                Storage::disk('public')->delete($admitCard->college_logo_url);
            }
            if ($admitCard->sign_url) {
                Storage::disk('public')->delete($admitCard->sign_url);
            }

            $admitCard->delete();

            return response()->json(['message' => 'Admit card deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete admit card: ' . $e->getMessage()], 500);
        }
    }
}
// class AdmitCardController extends Controller
// {
//     public function index(){
//         return Inertia::render('admin/AdmitCard');
//     }

//     public function getStudent(){
//         return Inertia::render('student/AdmitCard');
//     }
// public function folder(){
        
//     }














//       public function store(Request $request)
//     {
//         $request->validate([
//             'admin' => 'required|', // Ensure it's a valid user ID
//             'collegeName' => 'required|string|max:255',
//             'examType' => 'required|string|max:255',
//             'sessionOfExam' => 'required|string|max:255',
//             'collegeLogo' => 'required|image|max:2048',
//             'sign' => 'required|image|max:2048',
//             'generalInstructions' => 'nullable|json',
//             'notices' => 'nullable|json',
//         ]);

//         // Assuming you have admin auth, get admin id

//         // Store images to 'public/admit_cards' folder
//         $collegeLogoPath = $request->file('collegeLogo')->store('admit_cards/logos', 'public');
//         $signPath = $request->file('sign')->store('admit_cards/signs', 'public');

//         // Save record
//         $admitCard = admit_cards::create([
//            'admin_id' => $request->admin,
//             'college_name' => $request->collegeName,
//             'exam_type' => $request->examType,
//             'session_of_exam' => $request->sessionOfExam,
//             'college_logo_url' => Storage::url($collegeLogoPath),  // generates URL to file
//             'sign_url' => Storage::url($signPath),
//             'general_instructions' => $request->generalInstructions ? json_decode($request->generalInstructions, true) : null,
//             'notices' => $request->notices ? json_decode($request->notices, true) : null,
//         ]);

//         return response()->json(['message' => 'Admit card saved successfully', 'data' => $admitCard], 201);
//     }
//     // Fetch admit cards by admin ID
//     public function indexs($adminId)
//     {
//         try {
//             $admitCards = admit_cards::where('admin_id', $adminId)->get();
//             return response()->json(['admitCards' => $admitCards], 200);
//         } catch (\Exception $e) {
//             return response()->json(['message' => 'Failed to fetch admit cards: ' . $e->getMessage()], 500);
// }
//     }
//     // Update an admit card (Update)
//     public function update(Request $request, $id)
//     {
//         $validator = Validator::make($request->all(), [
//             'admin' => 'required|',
//             'collegeName' => 'required|string|max:255',
//             'examType' => 'required|string|max:255',
//             'sessionOfExam' => 'required|string|max:255',
//             'collegeLogo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
//             'sign' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
//             'generalInstructions' => 'required|json',
//             'notices' => 'required|json',
//         ]);

//         if ($validator->fails()) {
//             return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
//         }

//         try {
//             $admitCard = admit_cards::where('id', $id)->where('admin_id', $request->admin)->firstOrFail();

//             // Update images if provided
//             $data = [
//                 'college_name' => $request->collegeName,
//                 'exam_type' => $request->examType,
//                 'session_of_exam' => $request->sessionOfExam,
//                 'general_instructions' => json_decode($request->generalInstructions, true),
//                 'notices' => json_decode($request->notices, true),
//             ];

//             if ($request->hasFile('collegeLogo')) {
//                 // Delete old logo if exists
//                 if ($admitCard->college_logo_url) {
//                     Storage::disk('public')->delete($admitCard->college_logo_url);
//                 }
//                 $data['college_logo_url'] = $request->file('collegeLogo')->store('admit_cards/logos', 'public');
//             }

//             if ($request->hasFile('sign')) {
//                 // Delete old sign if exists
//                 if ($admitCard->sign_url) {
//                     Storage::disk('public')->delete($admitCard->sign_url);
//                 }
//                 $data['sign_url'] = $request->file('sign')->store('admit_cards/signs', 'public');
//             }

//             $admitCard->update($data);

//             return response()->json(['message' => 'Admit card updated successfully', 'data' => $admitCard], 200);
//         } catch (\Exception $e) {
//             return response()->json(['message' => 'Failed to update admit card: ' . $e->getMessage()], 500);
//         }
//     }

//     // Delete an admit card (Delete)
//     public function destroy($id)
//     {
//         try {
//             $admitCard = admit_cards::findOrFail($id);

//             // Delete associated images
//             if ($admitCard->college_logo_url) {
//                 Storage::disk('public')->delete($admitCard->college_logo_url);
//             }
//             if ($admitCard->sign_url) {
//                 Storage::disk('public')->delete($admitCard->sign_url);
//             }

//             $admitCard->delete();

//             return response()->json(['message' => 'Admit card deleted successfully'], 200);
//         } catch (\Exception $e) {
//             return response()->json(['message' => 'Failed to delete admit card: ' . $e->getMessage()], 500);
//         }
//     }
// }

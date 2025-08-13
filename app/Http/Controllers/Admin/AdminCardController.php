<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminCard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCardController extends Controller
{
    public function index(){
        return Inertia::render('admin/AdminCardCreate');
    }
     public function store($id, Request $request)
    {
        $validated = $request->validate([
            'admin_id' => 'required|integer',
            'admin_data' => 'required|array',
            'batch_data' => 'required|array',
            'students_data' => 'required|array',
        ]);

        $adminCard = AdminCard::create([
            'admin_id' => $validated['admin_id'],
            'admin_data' => $validated['admin_data'],
            'batch_data' => $validated['batch_data'],
            'students_data' => $validated['students_data'],
        ]);

        return response()->json([
            'message' => 'Admin Card created successfully',
            'data' => $adminCard
        ], 201);
    }
    public function getData($id){
         // Assuming you have an AdminCard model and it has an admin_id column

    // Fetch all Admin Cards for this admin id, with related data if needed
    $adminCards = AdminCard::where('admin_id', $id)->get();

    if ($adminCards->isEmpty()) {
        return response()->json([
            'message' => 'No admin cards found for this admin.',
            'data' => []
        ], 404);
    }

    return response()->json([
        'message' => 'Admin cards fetched successfully.',
        'data' => $adminCards
    ]);
    }
    public function inactivate($adminId, $cardId)
{
    // Find the card by id and admin_id
    $adminCard = AdminCard::where('id', $cardId)->where('admin_id', $adminId)->first();

    if (!$adminCard) {
        return response()->json([
            'message' => 'Admin card not found or does not belong to this admin.'
        ], 404);
    }

    // Update status to 'inactive'
    $adminCard->admin_data = array_merge(
        $adminCard->admin_data ?? [],
        ['status' => 'inactive']
    );

    $adminCard->save();

    return response()->json([
        'message' => 'Admin card status updated to inactive.',
        'data' => $adminCard
    ]);
}
public function activate($adminId, $cardId)
{
    $card = AdminCard::where('admin_id', $adminId)->where('id', $cardId)->firstOrFail();
    $adminData = $card->admin_data;
    $adminData['status'] = 'active';
    $card->admin_data = $adminData;
    $card->save();

    return response()->json(['message' => 'Card activated successfully']);
}
public function destroy($adminId, $cardId)
{
    $card = AdminCard::where('admin_id', $adminId)->where('id', $cardId)->firstOrFail();
    $card->delete();

    return response()->json(['message' => 'Card deleted successfully']);
}
public function getActiveStudentData($adminId, $studentId)
{
    $cards = AdminCard::where('admin_id', $adminId)
        ->where('admin_data->status', 'active')
        ->whereRaw("JSON_SEARCH(students_data, 'one', ?) IS NOT NULL", [$studentId])
        ->get();

    $results = $cards->map(function ($card) use ($studentId) {
        return collect($card->students_data)->firstWhere('student_id', $studentId);
    })->filter()->values();

    return response()->json([
        'message' => 'Matching student data fetched successfully.',
        'data' => $results
    ]);
}


}

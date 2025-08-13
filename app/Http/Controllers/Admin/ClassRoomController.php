<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassRoomController extends Controller
{
    // Show the ControlRoom page via Inertia
    public function index()
    {
        return Inertia::render('admin/ControlRoom');
    }

    // Store new classroom for given admin id
    public function store($adminId, Request $request)
    {
        $validated = $request->validate([
            'roomName' => 'required|string',
            'roomType' => 'required|integer',
        ]);

        $classRoom = new ClassRoom();
        $classRoom->room_name = $validated['roomName'];
        $classRoom->room_type = $validated['roomType'];
        $classRoom->admin_id = $adminId;
        $classRoom->save();

        return response()->json([
            'id' => $adminId,
            'data' => $classRoom,
            'message' => 'Room saved successfully',
        ]);
    }

    // Add update method for completeness
    public function update($adminId, $roomId, Request $request)
    {
        $validated = $request->validate([
            'roomName' => 'required|string',
            'roomType' => 'required|integer',
        ]);

        $classRoom = ClassRoom::where('id', $roomId)
            ->where('admin_id', $adminId)
            ->firstOrFail();

        $classRoom->room_name = $validated['roomName'];
        $classRoom->room_type = $validated['roomType'];
        $classRoom->save();

        return response()->json([
            'id' => $adminId,
            'data' => $classRoom,
            'message' => 'Room updated successfully',
        ]);
    }

    // Optional: delete room
    public function destroy($adminId, $roomId)
    {
        $classRoom = ClassRoom::where('id', $roomId)
            ->where('admin_id', $adminId)
            ->firstOrFail();

        $classRoom->delete();

        return response()->json([
            'message' => 'Room deleted successfully',
        ]);
    }
    public function getRoomsByAdmin($adminId)
{
    $rooms = ClassRoom::where('admin_id', $adminId)->get();

    return response()->json([
        'rooms' => $rooms,
        'message' => 'Rooms fetched successfully',
    ]);
}
}

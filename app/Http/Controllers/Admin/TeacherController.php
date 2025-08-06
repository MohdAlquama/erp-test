<?php
use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index($id, Request $request)
    {
        return response()->json($request->all());
    }
}

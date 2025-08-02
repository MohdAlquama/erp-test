<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportsController extends Controller
{
    public function index()
    {
        // Logic to fetch and prepare reports data
        return Inertia::render('admin/Reports');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinanceController extends Controller
{
    public function index()
    {
        // Dummy finance data – replace with real DB query
        $financeData = [
            [
                'id' => 1,
                'student' => 'Priya Sharma',
                'batch' => 'Batch A',
                'amount' => 15000,
                'status' => 'Paid',
                'date' => '2025-07-01',
            ],
            [
                'id' => 2,
                'student' => 'Rahul Verma',
                'batch' => 'Batch B',
                'amount' => 18000,
                'status' => 'Pending',
                'date' => '2025-07-03',
            ],
        ];

        return Inertia::render('admin/Finance', [
            'financeRecords' => $financeData,
        ]);
    }
}

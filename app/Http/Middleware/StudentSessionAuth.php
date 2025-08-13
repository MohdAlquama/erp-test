<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class StudentSessionAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    
{
        if (!$request->session()->has('student')) {
            // If API, return JSON
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Unauthorized. Please login.'
                ], 401);
            }

            // If web, redirect to login page
            return redirect()->route('student.login');
        }

        return $next($request);
    }    
}

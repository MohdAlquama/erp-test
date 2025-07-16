<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $role)
    {
        if (!$request->session()->has('subadmin')) {
            return redirect('/login');
        }

        $roles = $request->session()->get('subadmin.roles', []);

        // Check if required role exists
        if (!in_array(strtolower($role), $roles)) {
            abort(403, 'Unauthorized');
        }

        return $next($request);
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleNewMiddleware
{
   public function handle(Request $request, Closure $next, string $role)
    {
        if (!$request->session()->has('admin')) {
            return redirect('/');
        }

        $roles = $request->session()->get('admin.roles', []);

        // Check if required role exists
        if (!in_array(strtolower($role), $roles)) {
            abort(403, 'Unauthorized');
        }

        
        return $next($request);
    }
}

<?php


// use Illuminate\Foundation\Application;
// use Illuminate\Foundation\Configuration\Exceptions;
// use Illuminate\Foundation\Configuration\Middleware;

// return Application::configure(basePath: dirname(__DIR__))
//     ->withRouting(
//         web: __DIR__.'/../routes/web.php',
//         commands: __DIR__.'/../routes/console.php',
//         health: '/up',
//     )
//     ->withMiddleware(function (Middleware $middleware): void {
//         // ✅ Register route middleware aliases
//         $middleware->alias([
//             'role' => \App\Http\Middleware\RoleMiddleware::class,
//         ]);

//         // ✅ Web middleware
//         $middleware->web(
//             append: [
//                 \App\Http\Middleware\HandleInertiaRequests::class,
//                 \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
//             ]
//         );

//         // Optional: You can also register global or API middleware if needed
//         // $middleware->global([...]);
//         // $middleware->api([...]);
//     })
//     ->withExceptions(function (Exceptions $exceptions): void {
//         // You can customize exception rendering here
//         // $exceptions->renderable(function (Throwable $e, $request) {
//         //     return response()->json(['message' => $e->getMessage()], 500);
//         // });
//     })
//     ->create();

// // use Illuminate\Foundation\Application;
// // use Illuminate\Foundation\Configuration\Exceptions;
// // use Illuminate\Foundation\Configuration\Middleware;

// // return Application::configure(basePath: dirname(__DIR__))
// //     ->withRouting(
// //         web: __DIR__.'/../routes/web.php',
// //         commands: __DIR__.'/../routes/console.php',
// //         health: '/up', // health check endpoint for server uptime
// //     )

// //     ->withMiddleware(function (Middleware $middleware): void {
// //         // Web middleware group
// //         $middleware->web(
// //             append: [
// //                 \App\Http\Middleware\HandleInertiaRequests::class,
// //                 \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
// //             ],

// //             // ❗️ Uncomment the following to remove CSRF protection (NOT RECOMMENDED in production)
// //             // exclude: [
// //             //     \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class,
// //             // ]
// //         );

// //         // You can also define API or global middleware here if needed:
// //         // $middleware->api([...]);
// //         // $middleware->global([...]);
// //     })

// //     ->withExceptions(function (Exceptions $exceptions): void {
// //         // Customize how exceptions are reported or rendered here if needed
// //         // Example:
// //         // $exceptions->renderable(function (Throwable $e, $request) {
// //         //     return response()->json(['message' => $e->getMessage()], 500);
// //         // });
// //     })

// //     ->create();
// // $middleware->alias([
// //     'role' => \App\Http\Middleware\RoleMiddleware::class,
// // ])

// use Illuminate\Foundation\Application;
// use Illuminate\Foundation\Configuration\Exceptions;
// use Illuminate\Foundation\Configuration\Middleware;

// return Application::configure(basePath: dirname(__DIR__))
//     ->withRouting(
//         web: __DIR__.'/../routes/web.php',
//         commands: __DIR__.'/../routes/console.php',
//         health: '/up',
//     )
//     ->withMiddleware(function (Middleware $middleware): void {

//         // ✅ Register route middleware alias here
//         $middleware->alias([
//             'role' => \App\Http\Middleware\RoleMiddleware::class, // 👈 Your custom role middleware
//         ]);

//         // ✅ Web middleware group
//         $middleware->web(
//             append: [
//                 \App\Http\Middleware\HandleInertiaRequests::class,
//                 \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
//             ]
//         );

//         // Optional: Global or API middleware
//         // $middleware->global([...]);
//         // $middleware->api([...]);
//     })
//     ->withExceptions(function (Exceptions $exceptions): void {
//         // Custom exception rendering (optional)
//     })
//     ->create();


use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // ✅ Register route middleware alias
        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
        ]);

        // ✅ Web middleware
        $middleware->web(
            append: [
                \App\Http\Middleware\HandleInertiaRequests::class,
                \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            ]
        );
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Customize error handling if needed
    })
    ->create();

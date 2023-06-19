<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LibrarianAccess
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse) $next
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function handle(Request $request, Closure $next)
    {
        //Проверяем достаточно ли у пользователя уровень доступа для запросов библиотекаря
        if (auth('sanctum')->user()->role->access_level >= 5) {
            return $next($request);
        }
        //Возвращаем ошибку
        return response()->json([
            'success' => false,
            'message' => 'Access denied',
        ], 401);

    }
}

<?php

use App\Http\Controllers\Author\AuthorDestroyController;
use App\Http\Controllers\Author\AuthorIndexController;
use App\Http\Controllers\Author\AuthorReadController;
use App\Http\Controllers\Author\AuthorStoreController;
use App\Http\Controllers\Author\AuthorUpdateController;
use App\Http\Controllers\Book\BookDestroyController;
use App\Http\Controllers\Book\BookIndexController;
use App\Http\Controllers\Book\BookReadController;
use App\Http\Controllers\Book\BookStoreController;
use App\Http\Controllers\Book\BookUpdateController;
use App\Http\Controllers\Category\CategoryDestroyController;
use App\Http\Controllers\Category\CategoryIndexController;
use App\Http\Controllers\Category\CategoryReadController;
use App\Http\Controllers\Category\CategoryStoreController;
use App\Http\Controllers\Category\CategoryUpdateController;
use App\Http\Controllers\Country\CountryDestroyController;
use App\Http\Controllers\Country\CountryIndexController;
use App\Http\Controllers\Country\CountryReadController;
use App\Http\Controllers\Country\CountryStoreController;
use App\Http\Controllers\Country\CountryUpdateController;
use App\Http\Controllers\User\CheckUserController;
use App\Http\Controllers\User\UserLoginController;
use App\Http\Controllers\User\UserLogoutController;
use App\Http\Controllers\User\UserRegistrationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user', CheckUserController::class);
    Route::post('/logout', UserLogoutController::class);
    Route::middleware('librarian')->group(function () {
        Route::prefix('country')->group(function () {
            Route::get('/', CountryIndexController::class);
            Route::get('/{id}', CountryReadController::class);
            Route::post('/', CountryStoreController::class);
            Route::patch('/{id}/update', CountryUpdateController::class);
            Route::delete('/{id}', CountryDestroyController::class);
        });
        Route::prefix('category')->group(function () {
            Route::get('/', CategoryIndexController::class);
            Route::get('/{id}', CategoryReadController::class);
            Route::post('/', CategoryStoreController::class);
            Route::patch('/{id}/update', CategoryUpdateController::class);
            Route::delete('/{id}', CategoryDestroyController::class);
        });
        Route::prefix('author')->group(function () {
            Route::get('/', AuthorIndexController::class);
            Route::get('/{id}', AuthorReadController::class);
            Route::post('/', AuthorStoreController::class);
            Route::patch('/{id}/update', AuthorUpdateController::class);
            Route::delete('/{id}', AuthorDestroyController::class);
        });
        Route::prefix('book')->group(function () {
            Route::get('/', BookIndexController::class);
            Route::get('/{id}', BookReadController::class);
            Route::post('/', BookStoreController::class);
            Route::patch('/{id}/update', BookUpdateController::class);
            Route::delete('/{id}', BookDestroyController::class);
        });
    });
});
Route::post('/registration', UserRegistrationController::class);
Route::post('/login', UserLoginController::class);



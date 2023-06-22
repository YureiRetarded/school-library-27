<?php

use App\Http\Controllers\Author\AuthorAllController;
use App\Http\Controllers\Author\AuthorDestroyController;
use App\Http\Controllers\Author\AuthorIndexController;
use App\Http\Controllers\Author\AuthorParameterController;
use App\Http\Controllers\Author\AuthorReadController;
use App\Http\Controllers\Author\AuthorStoreController;
use App\Http\Controllers\Author\AuthorUpdateController;
use App\Http\Controllers\Book\BookAllController;
use App\Http\Controllers\Book\BookDestroyController;
use App\Http\Controllers\Book\BookIndexController;
use App\Http\Controllers\Book\BookReadController;
use App\Http\Controllers\Book\BookReadFileController;
use App\Http\Controllers\Book\BooksParameterController;
use App\Http\Controllers\Book\BookStoreController;
use App\Http\Controllers\Book\BookUpdateController;
use App\Http\Controllers\Category\CategoryAllController;
use App\Http\Controllers\Category\CategoryDestroyController;
use App\Http\Controllers\Category\CategoryIndexController;
use App\Http\Controllers\Category\CategoryReadController;
use App\Http\Controllers\Category\CategoryStoreController;
use App\Http\Controllers\Category\CategoryUpdateController;
use App\Http\Controllers\Country\CountryAllController;
use App\Http\Controllers\Country\CountryDestroyController;
use App\Http\Controllers\Country\CountryIndexController;
use App\Http\Controllers\Country\CountryReadController;
use App\Http\Controllers\Country\CountryStoreController;
use App\Http\Controllers\Country\CountryUpdateController;
use App\Http\Controllers\Global\CatalogParametersController;
use App\Http\Controllers\Rating\BookRatingController;
use App\Http\Controllers\Rating\DeleteUserBookRatingController;
use App\Http\Controllers\Rating\SetUserBookRatingController;
use App\Http\Controllers\Rating\UserBookRatingController;
use App\Http\Controllers\Status\DeleteUserStatusBookController;
use App\Http\Controllers\Status\SetUserStatusBookController;
use App\Http\Controllers\Status\StatusesController;
use App\Http\Controllers\Status\UserStatusBookController;
use App\Http\Controllers\User\CheckUserController;
use App\Http\Controllers\User\UserLoginController;
use App\Http\Controllers\User\UserLogoutController;
use App\Http\Controllers\User\UserRegistrationController;
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

//Запросы регистрации и входа
Route::post('/registration', UserRegistrationController::class);
Route::post('/login', UserLoginController::class);

//Запросы для всех пользователей
Route::prefix('category')->group(function () {
    Route::get('/', CategoryIndexController::class);
});

Route::get('/authors', AuthorParameterController::class);
Route::get('/author/{id}', AuthorReadController::class);
Route::get('/book/{id}/file', BookReadFileController::class);
Route::get('/books', BooksParameterController::class);
Route::get('/book/{id}', BookReadController::class);
Route::get('/catalog', CatalogParametersController::class);
Route::get('/country_all', CountryAllController::class);
Route::get('/book-rating/{id}', BookRatingController::class);
Route::get('/statuses', StatusesController::class);

//Запросы для авторизированных пользователей
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user-book-rating/{id}', UserBookRatingController::class);
    Route::post('/user-book-rating/{id}', SetUserBookRatingController::class);
    Route::delete('/user-book-rating/{id}', DeleteUserBookRatingController::class);
    Route::get('/user-statuses/{id}', UserStatusBookController::class);
    Route::post('/user-statuses/{id}', SetUserStatusBookController::class);
    Route::delete('/user-statuses/{id}', DeleteUserStatusBookController::class);
    Route::post('/user', CheckUserController::class);
    Route::post('/logout', UserLogoutController::class);
    //Запросы для пользователей с уровнем доступа библиотекаря
    Route::middleware('librarian')->group(function () {
        Route::prefix('country')->group(function () {
            Route::get('/', CountryIndexController::class);
            Route::get('/{id}', CountryReadController::class);
            Route::post('/', CountryStoreController::class);
            Route::patch('/{id}/update', CountryUpdateController::class);
            Route::delete('/{id}', CountryDestroyController::class);
        });

        Route::prefix('category')->group(function () {
            Route::get('/{id}', CategoryReadController::class);
            Route::post('/', CategoryStoreController::class);
            Route::patch('/{id}/update', CategoryUpdateController::class);
            Route::delete('/{id}', CategoryDestroyController::class);
        });
        Route::get('/category_all', CategoryAllController::class);
        Route::prefix('author')->group(function () {
            Route::get('/', AuthorIndexController::class);
            Route::post('/', AuthorStoreController::class);
            Route::patch('/{id}/update', AuthorUpdateController::class);
            Route::delete('/{id}', AuthorDestroyController::class);
        });
        Route::get('/author_all', AuthorAllController::class);

        Route::prefix('book')->group(function () {
            Route::get('/', BookIndexController::class);
            Route::post('/', BookStoreController::class);
            Route::patch('/{id}/update', BookUpdateController::class);
            Route::delete('/{id}', BookDestroyController::class);
        });
        Route::get('/book_all', BookAllController::class);
    });
});




<?php

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::group(["middleware"=>"auth"],function(){
    Route::get('/todo',TodoController::class . "@index");
});
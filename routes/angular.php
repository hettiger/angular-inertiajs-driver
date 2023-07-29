<?php

use Illuminate\Support\Facades\Route;

Route::view('/{any?}', 'generated.angular')->name('angular');

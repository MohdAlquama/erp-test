<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('batch_folders', function (Blueprint $table) {
            $table->id();
             $table->unsignedBigInteger('admin_id');
            $table->unsignedBigInteger('batch_id');
            $table->unsignedBigInteger('folder_id');
            

            $table->foreign('admin_id')->references('id')->on('admins')->onDelete('cascade');
            $table->foreign('batch_id')->references('id')->on('batches')->onDelete('cascade');
            $table->foreign('folder_id')->references('id')->on('admit_card_folders')->onDelete('cascade');
   
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('batch_folders');
    }
};

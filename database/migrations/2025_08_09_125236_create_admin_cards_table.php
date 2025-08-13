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
        Schema::create('admin_cards', function (Blueprint $table) {
            $table->id();
             $table->unsignedBigInteger('admin_id');
            $table->json('admin_data');
            $table->json('batch_data');
            $table->json('students_data');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_cards');
    }
};

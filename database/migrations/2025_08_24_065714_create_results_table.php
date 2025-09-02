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
        Schema::create('results', function (Blueprint $table) {
            $table->id();
                  
            $table->unsignedBigInteger('admin_id');
            $table->unsignedBigInteger('folder_id');
            $table->unsignedBigInteger('batch_id');
            $table->unsignedBigInteger('admit_card_id');
            $table->string('enrollment_number');
            $table->string('student_name');  // ✅ added
            $table->string('subject_name');
            $table->integer('max_marks');
            $table->integer('scored_marks');
$table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');            $table->timestamps();

            // foreign keys (optional)
            $table->foreign('admin_id')->references('id')->on('admins')->onDelete('cascade');
            $table->foreign('folder_id')->references('id')->on('admit_card_folders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('results');
    }
};

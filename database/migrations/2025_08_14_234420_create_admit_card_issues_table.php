<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admit_card_issues', function (Blueprint $table) {
            $table->id();

            // Foreign keys first
            $table->unsignedBigInteger('admin_id');
            $table->unsignedBigInteger('folder_id');
            $table->unsignedBigInteger('batch_id');

            $table->string('enrollment_number');
            $table->string('subject_name');
            $table->string('batch_name'); // you can keep this if you want the text label stored too
            $table->string('teacher_name');
            $table->string('student_name');
            $table->string('exam_venue')->nullable();
            $table->date('exam_date')->nullable();
            $table->time('exam_time')->nullable();

            // Foreign key constraints
            $table->foreign('admin_id')
                ->references('id')
                ->on('admins')
                ->onDelete('cascade');

            $table->foreign('folder_id')
                ->references('id')
                ->on('admit_card_folders')
                ->onDelete('cascade');

            $table->foreign('batch_id')
                ->references('id')
                ->on('batches')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admit_card_issues');
    }
};

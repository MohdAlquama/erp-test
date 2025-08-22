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
        Schema::create('admit_card_folders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('admin_id');
            $table->string('folder_name');
            $table->text('description')->nullable();
            $table->year('year'); // Year column
            $table->unsignedBigInteger('exam_type_id'); // Exam type ka ID
            $table->timestamps();

            $table->foreign('admin_id')
                  ->references('id')
                  ->on('admins')
                  ->onDelete('cascade');

            $table->foreign('exam_type_id')
                  ->references('id')
                  ->on('exam_types') // yaha tumhare exam types ka table name
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admit_card_folders');
    }
};

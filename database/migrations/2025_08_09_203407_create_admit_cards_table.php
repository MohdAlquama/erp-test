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
        Schema::create('admit_cards', function (Blueprint $table) {
            $table->id();
          $table->unsignedBigInteger('admin_id'); 
            $table->string('college_name');
            $table->string('exam_type');
            $table->string('session_of_exam');
            $table->string('college_logo_url');  // store URL/path of logo
            $table->string('sign_url');          // store URL/path of sign image
            $table->json('general_instructions')->nullable();
            $table->json('notices')->nullable();
            $table->timestamps(); // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admit_cards');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();

            $table->string('admin_id')->nullable(); // Foreign key to Admin table, nullable for super admin
            $table->string('name');
            $table->string('father_name')->nullable();  // Added father_name column
            $table->string('session')->nullable();      // Added session column

            $table->string('email')->unique();
            $table->string('password')->nullable();
            $table->string('enrollment_number')->unique();

            $table->string('contact_number')->nullable();
            $table->enum('status', ['Active', 'Inactive'])->default('Active');

            $table->json('batch_ids')->nullable(); // Store batch IDs as JSON array
            $table->string('gender')->nullable(); // or after appropriate column
            $table->date('dob')->nullable();
            $table->string('profile_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};

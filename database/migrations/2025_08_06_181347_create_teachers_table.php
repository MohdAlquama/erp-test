<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('admin_id');   // Foreign key to Admin
            $table->string(column: 'name');
            $table->string('email')->nullable();
            $table->string('status')->default('Active');
            $table->string(column: 'password');
            $table->string('role')->default('Teacher'); // Default role for teachers
            $table->json('batch_ids')->nullable();    // Store assigned batches as JSON array
            $table->json('subject_ids')->nullable();  // Store assigned subjects as JSON array

            $table->timestamps();

            // Add foreign key constraint

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};

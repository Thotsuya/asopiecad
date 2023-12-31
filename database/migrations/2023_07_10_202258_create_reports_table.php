<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId('project_id')
                ->constrained()
                ->onDelete('cascade');
            $table
                ->string('title')
                ->nullable();
            $table
                ->text('fields');
            $table
                ->text('global_fields')
                ->nullable();
            $table
                ->timestamp('generated_at')
                ->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reports');
    }
};

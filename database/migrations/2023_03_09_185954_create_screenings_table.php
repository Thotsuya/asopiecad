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
        Schema::create('screenings', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('user_id')->constrained(); // User who created the screening
            $table->string('municipality');
            $table->string('department');
            $table->date('date_of_screening');
            $table->string('name');
            $table->integer('age');
            $table->string('gender');

            // Communication
            $table->integer('communication_level_1')->default(0);
            $table->integer('communication_level_2')->default(0);
            $table->integer('communication_level_3')->default(0);
            $table->integer('communication_level_4')->default(0);
            $table->integer('communication_level_5')->default(0);
            $table->integer('communication_level_6')->default(0);

            // Wide movements
            $table->integer('wide_movements_level_1')->default(0);
            $table->integer('wide_movements_level_2')->default(0);
            $table->integer('wide_movements_level_3')->default(0);
            $table->integer('wide_movements_level_4')->default(0);
            $table->integer('wide_movements_level_5')->default(0);
            $table->integer('wide_movements_level_6')->default(0);

            // Fine movements
            $table->integer('fine_movements_level_1')->default(0);
            $table->integer('fine_movements_level_2')->default(0);
            $table->integer('fine_movements_level_3')->default(0);
            $table->integer('fine_movements_level_4')->default(0);
            $table->integer('fine_movements_level_5')->default(0);
            $table->integer('fine_movements_level_6')->default(0);

            // Problem solving
            $table->integer('problem_solving_level_1')->default(0);
            $table->integer('problem_solving_level_2')->default(0);
            $table->integer('problem_solving_level_3')->default(0);
            $table->integer('problem_solving_level_4')->default(0);
            $table->integer('problem_solving_level_5')->default(0);
            $table->integer('problem_solving_level_6')->default(0);

            // Social individual
            $table->integer('social_individual_level_1')->default(0);
            $table->integer('social_individual_level_2')->default(0);
            $table->integer('social_individual_level_3')->default(0);
            $table->integer('social_individual_level_4')->default(0);
            $table->integer('social_individual_level_5')->default(0);
            $table->integer('social_individual_level_6')->default(0);

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
        Schema::dropIfExists('screenings');
    }
};

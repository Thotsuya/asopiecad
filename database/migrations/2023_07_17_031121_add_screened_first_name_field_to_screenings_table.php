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
        Schema::table('screenings', function (Blueprint $table) {
            $table->string('type')->default('P-4211');
            $table->string('first_name')->nullable();
            $table->string('second_name')->nullable();
            $table->string('first_surname')->nullable();
            $table->string('second_surname')->nullable();
            $table->string('disability_yes_no')->nullable();
            $table->string('disability_type')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('document')->nullable();
            $table->string('address')->nullable();
            $table->string('screened_deparment')->nullable();
            $table->string('screened_municipality')->nullable();
            $table->string('screened_phone_number')->nullable();
            $table->string('screened_visual_acuity')->nullable();
            $table->string('screened_refered')->nullable();
            $table->text('screened_observations')->nullable();
            $table->string('screened_visual_acuity_right')->nullable();
            $table->string('screened_visual_acuity_left')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('screenings', function (Blueprint $table) {
            //
        });
    }
};

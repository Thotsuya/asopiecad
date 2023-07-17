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
            /*
             * first_name: '',
        second_name: '',
        first_surname: '',
        second_surname: '',
        //gender
        //age
        disability_yes_no: '',
        disability_type: '',
        date_of_birth: new Date().toISOString().split('T')[0],
        document: '',
        address: '',
        screened_deparment: 'managua',
        screened_municipality: '',
        screened_phone_number: '',
        screened_visual_acuity: '',
        screened_refered: '',
        screened_observations: '',
        screened_visual_acuity_right: '',
        screened_visual_acuity_left: '',
             * */
            $table->string('type')->default('P-4211');
            $table->string('first_name')->nullable();
            $table->string('second_name')->nullable();
            $table->string('first_surname')->nullable();
            $table->string('second_surname')->nullable();
            $table->string('disability_yes_no')->nullable();
            $table->string('disability_type')->nullable();
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

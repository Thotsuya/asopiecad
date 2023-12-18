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
        Schema::table('answers', function (Blueprint $table) {
            //Add an index to the value column
            $table->index('value', 'answers_value_index');
            //Add an index to the field_id column
            $table->index('field_id', 'answers_field_id_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('answers', function (Blueprint $table) {

                //Drop the index to the value column
                $table->dropIndex('answers_value_index');
                //Drop the index to the field_id column
                $table->dropIndex('answers_field_id_index');
        });
    }
};

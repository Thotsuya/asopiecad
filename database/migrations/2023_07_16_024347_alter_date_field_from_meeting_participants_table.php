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
        Schema::table('meeting_participants', function (Blueprint $table) {
            //Delete the colummns: name, document, count, date, last_meeting_date
            $table->dropColumn(['name','document','count','date','last_meeting_date']);
            //Add the columns: form_id, form_data
            $table->foreignId('form_id')->after('meeting_id')->nullable()->constrained('forms')->onDelete('cascade');
            $table->json('form_data')->after('form_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('meeting_participants', function (Blueprint $table) {
            //Delete the colummns: form_id, form_data
            $table->dropForeign(['form_id']);
            $table->dropColumn(['form_id','form_data']);
            //Add the columns: name, document, count, date, last_meeting_date
            $table->string('name');
            $table->string('document')->nullable();
            $table->integer('count')->default(1);
            $table->timestamp('date')->nullable();
            $table->timestamp('last_meeting_date')->nullable();
        });
    }
};

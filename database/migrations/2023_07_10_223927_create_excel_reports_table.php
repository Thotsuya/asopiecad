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
        Schema::create('excel_reports', function (Blueprint $table) {
            $table->id();
            $table->text('file_name');
            $table->string('file_path');
            $table->timestamp('generated_at')->nullable();
            $table->morphs('reportable');
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
        Schema::dropIfExists('excel_reports');
    }
};

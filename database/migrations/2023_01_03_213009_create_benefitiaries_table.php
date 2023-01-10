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
        Schema::create('benefitiaries', function (Blueprint $table) {
            $table->id();
            $table->integer('internal_id')->nullable();
            $table->string('name');
            $table->integer('internal_status')->default(0);
            $table->date('approved_at')->nullable();
            $table->string('deletion_reason')->nullable();
            $table->softDeletes();
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
        Schema::dropIfExists('benefitiaries');
    }
};

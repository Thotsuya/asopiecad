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
            $table->uuid('uuid')->unique();
            $table->string('internal_id')->nullable();
            $table->string('name');
            $table->string('internal_status')->default(\App\Models\Benefitiary::INTERNAL_STATUSES['pending']);
            $table->timestamp('approved_at')->nullable();
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

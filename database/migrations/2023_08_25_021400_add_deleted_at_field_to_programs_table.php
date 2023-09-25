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
        Schema::table('programs', function (Blueprint $table) {
            $table
                ->softDeletes()
                ->after('updated_at')
                ->comment('This field is used to soft delete a program. It is nullable by default, but will be populated when a program is deleted.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('programs', function (Blueprint $table) {
            if (Schema::hasColumn('programs', 'deleted_at')) {
                $table->dropColumn('deleted_at');
            }
        });
    }
};

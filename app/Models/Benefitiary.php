<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Benefitiary extends Model
{
    use HasFactory;

    // Relationships

    public function projects(){
        return $this->belongsToMany(Project::class);
    }

    public function programs(){
        return $this->belongsToMany(Program::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description'
    ];

    public function programs(){
        return $this->hasMany(Program::class);
    }

    public function beneficiaries(){
        return $this->belongsToMany(Benefitiary::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description'
    ];

    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function beneficiaries(){
        return $this->belongsToMany(Benefitiary::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    use HasFactory;

    protected $fillable = [
        'goal_description',
        'project_id',
        'program_id',
        'goal_target',
        'conditions',
        'group_every',
    ];

    protected $casts = [
        'conditions' => 'array',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }


    public function program()
    {
        return $this->belongsTo(Program::class);
    }




}

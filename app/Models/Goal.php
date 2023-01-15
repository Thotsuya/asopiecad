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
        'user_id',
        'goal_target',
        'goal_status',
    ];

    public const GOAL_STATUS = [
        0 => 'No iniciado',
        1 => 'En progreso',
        2 => 'Completado',
    ];


    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function goalProgress()
    {
        return $this->hasMany(GoalProgress::class);
    }



}

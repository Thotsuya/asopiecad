<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GoalProgress extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'goal_id',
        'user_id',
        'progress',
    ];

    protected $with = ['user'];

    protected $touches = ['goal'];

    public function goal()
    {
        return $this->belongsTo(Goal::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

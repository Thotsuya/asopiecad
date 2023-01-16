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
        'goal_progress',
        'goal_description',
    ];

    protected $with = ['user'];

    protected $touches = ['goal'];

    // Always fetch by descending order
    protected static function booted()
    {
        static::addGlobalScope('order', function ($builder) {
            $builder->orderBy('created_at', 'desc');
        });
    }

    public function goal()
    {
        return $this->belongsTo(Goal::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

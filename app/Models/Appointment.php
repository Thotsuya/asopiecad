<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Appointment extends Model
{
    use HasFactory, SoftDeletes;

    protected $touches = ['project'];

    protected $fillable = [
        'start_date',
        'end_date',
        'benefitiary_id',
        'project_id',
        'comments',
        'user_id',
        'title',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'comments' => 'array',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function benefitiary()
    {
        return $this->belongsTo(Benefitiary::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupedResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'project_id'
    ];



    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function goals()
    {
        return $this->belongsToMany(Goal::class)->withPivot('value');
    }

    public function meetings()
    {
        return $this->belongsToMany(Meeting::class)->withPivot('value');
    }
}

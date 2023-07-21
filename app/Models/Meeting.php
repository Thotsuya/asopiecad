<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Meeting extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'title',
        'count',
        'meeting_target',
        'form_id',
    ];

    public function getRouteKeyName()
    {
        return 'uuid';
    }

    protected static function booted()
    {
        parent::boot();
        static::creating(function($model){
            $model->uuid = (string) Str::uuid();
        });

    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function participants()
    {
        return $this->hasMany(MeetingParticipant::class);
    }

    public function form()
    {
        return $this->belongsTo(Form::class);
    }

    public function groupedResults()
    {
        return $this->belongsToMany(GroupedResult::class)->withPivot('value');
    }

    public function excelReports()
    {
        return $this->morphMany(ExcelReports::class, 'reportable');
    }
}

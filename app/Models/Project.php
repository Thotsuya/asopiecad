<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Project extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'project_name',
        'project_description',
        'global_goal',
        'project_duration',
        'project_start_date',
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

    public function programs(){
        return $this->hasMany(Program::class);
    }

    public function beneficiaries(){
        return $this->belongsToMany(Benefitiary::class)->withTimestamps();
    }

    public function users(){
        return $this->belongsToMany(User::class);
    }

    public function appointments(){
        return $this->hasMany(Appointment::class);
    }

    public function goals(){
        return $this->hasMany(Goal::class);
    }

    public function meetings(){
        return $this->hasMany(Meeting::class);
    }

    public function report()
    {
        return $this->hasOne(Report::class);
    }

    public function excelReports()
    {
        return $this->morphMany(ExcelReports::class, 'reportable');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_name',
        'project_description'
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
        return $this->belongsToMany(Benefitiary::class);
    }

    public function users(){
        return $this->belongsToMany(User::class)->withPivot(['role_id']);
    }

    public function forms(){
        return $this->belongsToMany(Form::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'program_name',
        'description',
        'order'
    ];

    protected $touches = ['project'];

    protected $appends = ['edit_mode'];

    protected static function booted()
    {
        parent::boot();
        static::creating(function($model){
            $model->uuid = (string) Str::uuid();
            $model->order = $model->project->programs()->count() + 1;
        });

    }

    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function beneficiaries(){
        return $this->belongsToMany(Benefitiary::class)->withTimestamps();
    }

    public function forms(){
        return $this->belongsToMany(Form::class)->withTimestamps();
    }

    public function getEditModeAttribute(){
        return false;
    }


}

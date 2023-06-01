<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Screening extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'user_id',
        'registrant_name',
        'gender',
        'age',
        'date_of_screening',
        'municipality',
        'department',
        'communication_level_1',
        'communication_level_2',
        'communication_level_3',
        'communication_level_4',
        'communication_level_5',
        'communication_level_6',
        'wide_movements_level_1',
        'wide_movements_level_2',
        'wide_movements_level_3',
        'wide_movements_level_4',
        'wide_movements_level_5',
        'wide_movements_level_6',
        'fine_movements_level_1',
        'fine_movements_level_2',
        'fine_movements_level_3',
        'fine_movements_level_4',
        'fine_movements_level_5',
        'fine_movements_level_6',
        'problem_solving_level_1',
        'problem_solving_level_2',
        'problem_solving_level_3',
        'problem_solving_level_4',
        'problem_solving_level_5',
        'problem_solving_level_6',
        'social_individual_level_1',
        'social_individual_level_2',
        'social_individual_level_3',
        'social_individual_level_4',
        'social_individual_level_5',
        'social_individual_level_6',
    ];

    public function getRouteKeyName()
    {
        return 'uuid';
    }

    public const GENDERS = [
        'masculino' => 'Masculino',
        'femenino' => 'Femenino',
    ];

    protected static function booted()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->uuid = (string) Str::uuid();
        });

    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function scopeSearch($query,$request){
        return $query->when($request->search, function($query) use($request){
            $query->where('name', 'like', '%' . $request->search . '%');
        });
    }
}

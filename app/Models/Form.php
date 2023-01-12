<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    use HasFactory;

    protected $fillable = [
        'form_name',
        'form_fields'
    ];

    protected $casts = [
        'form_fields' => 'array'
    ];

    protected $appends = [
        'fields_count'
    ];


    protected $touches = ['projects'];

    public function getFieldsCountAttribute(): int
    {
        return collect($this->form_fields)->map(function ($tab) {
            return count($tab['fields']);
        })->sum();
    }

    public function projects(){
        return $this->belongsToMany(Project::class);
    }


}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use App\Traits\HasValidationRulesAndMessages;

class Form extends Model
{
    use HasFactory, HasSlug, HasValidationRulesAndMessages;

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

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('form_name')
            ->saveSlugsTo('form_slug');
    }

    public function getFieldsCountAttribute(): int
    {
        return collect($this->form_fields)->map(function ($tab) {
            return count($tab['fields']);
        })->sum();
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }

    public function benefitiaries()
    {
        return $this->belongsToMany(Benefitiary::class)->withPivot(['form_data']);
    }
}

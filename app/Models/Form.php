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
    ];


    protected $touches = ['programs', 'benefitiaries'];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('form_name')
            ->saveSlugsTo('form_slug');
    }


    public function benefitiaries()
    {
        return $this->belongsToMany(Benefitiary::class)->withTimestamps();
    }

    public function programs()
    {
        return $this->belongsToMany(Program::class)->withTimestamps();
    }

    public function tabs()
    {
        return $this->hasMany(Tab::class);
    }

    public function fields()
    {
        return $this->hasManyThrough(Field::class, Tab::class);
    }

    public function meetings()
    {
        return $this->hasMany(Meeting::class);
    }

    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }
}

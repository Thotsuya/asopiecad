<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;


class Field extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'name',
        'slug',
        'type',
        'required',
        'options',
        'size',
        'tab_id',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function tab()
    {
        return $this->belongsTo(Tab::class);
    }

    public function Options(): Attribute
    {
        return new Attribute(
            get: fn($value) => json_decode($value, true),
            set: fn($value) => json_encode($value)
        );
    }

    public function benefitiaries()
    {
        return $this->belongsToMany(Benefitiary::class, 'answers')->using(Answer::class)->withPivot(
            [
                'value',
                'type',
            ]
        )->withTimestamps();
    }


}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Tab extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'tab_name',
        'tab_slug',
        'order',
        'form_id',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('tab_name')
            ->saveSlugsTo('tab_slug');
    }

    protected static function booted()
    {
        parent::boot();
        static::creating(function ($model) {
            $lastOrder = self::where('form_id', $model->form_id)->orderBy('order', 'desc')->first()->order ?? 0;
            $model->order = $lastOrder + 1;
        });

    }

    public function form()
    {
        return $this->belongsTo(Form::class);
    }

    public function fields()
    {
        return $this->hasMany(Field::class);
    }
}

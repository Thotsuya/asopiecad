<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Form extends Model
{
    use HasFactory, HasSlug;

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
    public function getSlugOptions() : SlugOptions
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

    public function projects(){
        return $this->belongsToMany(Project::class);
    }

    public function getFormValidationRules(){
        $rules = [];

        collect($this->form_fields)->each(function ($tab) use (&$rules){
            collect($tab['fields'])->each(function ($field) use (&$rules){
                if($field['required']){
                    $rules[$field['slug'].'-'.$this->form_slug.'-'.$this->id] = 'required';
                }
            });
        });

        return $rules;
    }

    public function getFormValidationMessages(){
        $messages = [];

        collect($this->form_fields)->each(function ($tab) use (&$messages){
            collect($tab['fields'])->each(function ($field) use (&$messages){
                if($field['required']){
                    $messages[$field['slug'].'-'.$this->form_slug.'-'.$this->id.'.required'] = 'El campo '.$field['name'].' es requerido';
                }
            });
        });

        return $messages;
    }


}

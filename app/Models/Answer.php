<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Answer extends Pivot
{
    use HasFactory;

    protected $table = 'answers';

    protected $fillable = [
        'value',
        'type',
    ];

    protected $touches = ['benefitiary'];


    public function benefitiary()
    {
        return $this->belongsTo(Benefitiary::class);
    }

    public function field()
    {
        return $this->belongsTo(Field::class);
    }

    public function value() : Attribute
    {
        // Infere the type of the field
        $type = $this->type;

        // Return the value casted to the correct type
        return new Attribute(
            get: fn($value) => match ($type) {
                'checkbox', 'select', 'radio', 'select multiple' => json_decode($value, true),
                default => $value,
            },
            set: fn($value) => match ($type) {
                'checkbox', 'select', 'radio', 'select multiple' => json_encode($value),
                default => $value,
            }
        );
    }
}

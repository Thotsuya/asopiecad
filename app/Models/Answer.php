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
}

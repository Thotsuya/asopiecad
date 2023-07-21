<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BeneficiaryReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'fields',
        'generated_at',
    ];

    protected $casts = [
        'fields' => 'array',
    ];
}

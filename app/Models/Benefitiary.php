<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Benefitiary extends Model
{
    use HasFactory;

    protected $touches = ['projects'];

    protected $fillable = [
        'internal_id',
        'name',
        'internal_status',
        'approved_at',
        'deletion_reason'
    ];

    public const INTERNAL_STATUSES = [
        'pending' => 'Pending',
        'approved' => 'Approved',
        'rejected' => 'Rejected',
        'deleted' => 'Deleted',
    ];

    // Relationships

    protected static function booted()
    {
        parent::boot();
        static::creating(function ($model) {
            // Generate a random 8 digit code, mixing numbers and letters
            $letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $numbers = '0123456789';

            $code = '';

            for ($i = 0; $i < 4; $i++) {
                $code .= $letters[rand(0, strlen($letters) - 1)];
            }

            for ($i = 0; $i < 4; $i++) {
                $code .= $numbers[rand(0, strlen($numbers) - 1)];
            }

            // Mix the code
            $code = str_shuffle($code);

            $model->internal_id = $code;
            $model->uuid = (string) Str::uuid();
        });

    }


    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }

    public function programs()
    {
        return $this->belongsToMany(Program::class);
    }
}

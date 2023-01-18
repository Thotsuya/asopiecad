<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class Benefitiary extends Model
{
    use HasFactory, SoftDeletes;

    protected $touches = ['projects'];

    protected $fillable = [
        'internal_id',
        'name',
        'internal_status',
        'approved_at',
        'deletion_reason'
    ];

    public const INTERNAL_STATUSES = [
        'pending' => 'Pendiente de aprobación',
        'approved' => 'Aprobado',
        'rejected' => 'Rechazado',
        'deleted' => 'Eliminado',
    ];

    protected $casts = [
        'beneficiary_data' => 'json',
    ];


    public function getRouteKeyName()
    {
       return 'uuid';
    }

    // Relationships

    protected static function booted()
    {
        parent::boot();
        static::creating(function ($model) {
            $lastInternalId = self::withTrashed()->orderBy('internal_id', 'desc')->first()->internal_id ?? 0;

            $model->internal_id = str_pad($lastInternalId + 1, 8, '0', STR_PAD_LEFT);
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

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function forms()
    {
        return $this->belongsToMany(Form::class)->withPivot(['form_data']);
    }

}

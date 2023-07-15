<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
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
        'deletion_reason',
        'approved_by',
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
        return $this->belongsToMany(Project::class)->withTimestamps();
    }

    public function programs()
    {
        return $this->belongsToMany(Program::class)->withTimestamps();
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function forms()
    {
        return $this->belongsToMany(Form::class);
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function answers(){
        return $this->belongsToMany(Field::class, 'answers')->using(Answer::class)->withPivot(['value'])->withTimestamps();
    }

    public function scopeFilter($query, Request $request)
    {
        return match ($request->filter) {
            'name' => $query->where('name', 'like', "%{$request->value}%"),
            'code' => $query->where('internal_id', 'like', "%{$request->value}%"),
            'project_id' => $query
                ->whereHas('projects', function ($query) use ($request) {
                    $query->where('uuid', 'like', "%{$request->value}%");
                })
                ->when($request->program_id, function ($query) use ($request) {
                    $query->whereHas('programs', function ($query) use ($request) {
                        $query->where('uuid', 'like', "%{$request->program_id}%");
                    });
                }),
            'form_id' => $query->whereHas('answers', function ($query) use ($request) {
                $query
                    ->where('field_id', $request->field_id)
                    ->where('value', "{$this->queryOperands($request->operator)}", "{$this->queryValues($request->operator, $request->value)}");
            }),
            'created_at' => $query->whereBetween('created_at', [Carbon::parse($request->from)->startOfDay(), Carbon::parse($request->to)->endOfDay()]),
            'program_id' => $query->whereHas('programs', function ($query) use ($request) {
                $query->where('programs.id', '=', $request->value);
            }),
            default => $query,
        };
    }

    public function scopeApproved($query)
    {
        return $query->whereNotNull('approved_at');
    }

    public function scopeIncomingAppointments($query)
    {
        $query->whereHas('appointments', function ($query) {
            $query->where(DB::raw('DATE_ADD(start_date, INTERVAL 3 MONTH)'), '>', now());
        });
    }

    public function scopeBeneficiaryStatus($query, $request)
    {
        return $query->when($request->status, function ($query) use ($request) {
            return match ($request->status) {
                'pending' => $query->whereNull('approved_at'),
                'approved' => $query->whereNotNull('approved_at'),
                default => $query,
            };
        });
    }

    public function scopeViewableBy($query, User $user)
    {
        return $query->whereHas('projects', function ($query) use ($user) {
            $query->whereHas('users', function ($query) use ($user) {
                $query->where('users.id', $user->id);
            });
        });
    }

    private function queryOperands($operator){
        return match ($operator) {
            '==' => '=',
            '!=' => '!=',
            '>' => '>',
            '<' => '<',
            '>=' => '>=',
            '<=' => '<=',
            'contains', 'starts_with', 'ends_with' => 'like',
            'not_contains' => 'not like',
            default => '=',
        };
    }

    private function queryValues($operator, $value){
        return match ($operator) {
            'contains', 'not_contains' => "%{$value}%",
            'starts_with' => "{$value}%",
            'ends_with' => "%{$value}",
            default => $value,
        };
    }
}

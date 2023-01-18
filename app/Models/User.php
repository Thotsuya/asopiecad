<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, SoftDeletes;

    const SUPER_ADMIN = 'Super Admin';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $touches = ['projects'];

    protected $appends = ['abilities'];

    public function projects(){
        return $this->belongsToMany(Project::class);
    }

    public function appointments(){
        return $this->hasMany(Appointment::class);
    }

    public function goals(){
        return $this->hasMany(Goal::class);
    }

    public function goalProgresses(){
        return $this->hasMany(GoalProgress::class);
    }

    public function getAbilitiesAttribute(){
        return $this->getAllPermissions()->pluck('name');
    }

}

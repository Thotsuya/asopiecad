<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeetingParticipant extends Model
{
    use HasFactory;

    protected $fillable = [
        'meeting_id',
        'form_id',
        'form_data',
    ];

    protected $casts = [
        'form_data' => 'array',
    ];

    public function meeting()
    {
        return $this->belongsTo(Meeting::class);
    }


}

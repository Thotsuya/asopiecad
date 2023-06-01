<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeetingParticipant extends Model
{
    use HasFactory;

    protected $fillable = [
        'meeting_id',
        'name',
        'document',
        'count',
        'date',
        'last_meeting_date',
    ];

    public function meeting()
    {
        return $this->belongsTo(Meeting::class);
    }


}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Meeting;
use App\Models\MeetingParticipant;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    public function update(MeetingParticipant $participant,Request $request){

        $participant->update([
            'name' => $request->name,
            'document' => $request->document,
            'last_meeting_date' => $request->date,
            'date' => $request->date,
            'count' => $participant->count + 1
        ]);

        return redirect()->route('meetings.edit',$participant->meeting);


    }

    public function store(Request $request){

        $request->validate([
            'meeting_id' => ['required','exists:meetings,id'],
            'name' => ['required','string'],
            'document' => ['nullable','string'],
            'date' => ['required','date']
        ]);

        $participant = MeetingParticipant::create([
            'meeting_id' => $request->meeting_id,
            'name' => $request->name,
            'document' => $request->document,
            'date' => $request->date,
            'count' => 1
        ]);

        $participant->meeting->update([
            'count' => $participant->meeting->count + 1
        ]);

        return redirect()->route('meetings.edit',$participant->meeting);
    }
}

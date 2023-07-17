<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MeetingParticipantsRequest;
use App\Models\Meeting;
use App\Models\MeetingParticipant;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{

    public function store(MeetingParticipantsRequest $request){



        $participant = MeetingParticipant::create([
            'meeting_id' => $request->validated()['meeting_id'],
            'form_id' => $request->validated()['form_id'],
            'form_data' => collect($request->validated())->except(['meeting_id','form_id','add_one_meeting'])->toArray()
        ]);

        if($request->validated()['add_one_meeting']){
            $participant->meeting->increment('count');
        }

        return redirect()->route('meetings.edit',$participant->meeting);
    }

    public function update(MeetingParticipant $participant,MeetingParticipantsRequest $request)
    {

        $participant->update([
            'form_data' => collect($request->validated())->except(['meeting_id','form_id','add_one_meeting'])->toArray()
        ]);

        return redirect()->route('meetings.edit', $participant->meeting);
    }
}

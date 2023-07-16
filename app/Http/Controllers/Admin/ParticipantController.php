<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MeetingParticipantsRequest;
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

    public function store(MeetingParticipantsRequest $request){

        $participant = MeetingParticipant::create([
            'meeting_id' => $request->validated()['meeting_id'],
            'form_id' => $request->validated()['form_id'],
            'form_data' => collect($request->validated())->except(['meeting_id','form_id'])->toArray()
        ]);

        return redirect()->route('projects.show',$participant->meeting->project);
    }
}

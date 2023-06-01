<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class MeetingParticipantsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'                => $this->id,
            'name'              => $this->name,
            'total_meetings'    => $this->count,
            'document'          => $this->document,
            'last_meeting_date' => $this->last_meeting_date ? Carbon::parse($this->last_meeting_date)->translatedFormat(
                'l jS F Y'
            ) : null,
            'date'              => Carbon::parse($this->date)->translatedFormat('l jS F Y'),
        ];
    }
}

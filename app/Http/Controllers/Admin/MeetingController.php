<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MeetingRequest;
use App\Http\Resources\MeetingResource;
use App\Jobs\ExportProjectMeetingsToExcel;
use App\Models\Meeting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MeetingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(MeetingRequest $request)
    {

        $meeting = Meeting::create($request->validated());
        return redirect()->route('projects.show',$meeting->project);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show(Meeting $meeting)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function edit(Meeting $meeting)
    {
        return Inertia::render('Meetings/Edit',[
            'meeting' => MeetingResource::make($meeting->load(
                [
                    'form' => function($query){
                        $query->with(['tabs','fields']);
                    },
                    'participants'
                ]
            )),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Meeting $meeting)
    {
        $request->validate([
            'title' => 'required',
            'conditions' => ['required','array'],
        ]);


        $meeting->update([
            'title' => $request->title,
            'conditions' => $request->conditions ?? $meeting->conditions,
        ]);

        return redirect()->route('meetings.edit',$meeting)->with('success','Meeting updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function export(Meeting $meeting){

        ExportProjectMeetingsToExcel::dispatch($meeting->load(['form','participants','project']));

        return redirect()->route('meetings.edit',$meeting)->with('success','Exporting meeting to excel');
    }
}

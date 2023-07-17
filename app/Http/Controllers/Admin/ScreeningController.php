<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ScreeningRequest;
use App\Http\Resources\ScreeningResource;
use App\Models\Screening;
use Illuminate\Http\Request;

class ScreeningController extends Controller
{

    public function __construct()
    {
        $this->middleware('can:Ver Tamizajes')->only('index');
        $this->middleware('can:Registrar Tamizaje')->only('store');
        $this->middleware('can:Editar Tamizaje')->only('update');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index(Request $request)
    {
        return \inertia('Screenings/Index', [
            'screenings' => Screening::query()
                ->search($request)
                ->filterByType($request->type)
                ->latest()
                ->with('user')
                ->paginate(20)
                ->through(function ($screening) {
                    return ScreeningResource::make($screening);
                })
                ->withQueryString(),
            'type' => $request->type ?? 'P-4211'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function create(Request $request)
    {
        return \inertia('Screenings/Create',[
            'type' => $request->type ?? 'P-4211'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(ScreeningRequest $request)
    {
        auth()->user()->screenings()->create($request->validated());

        return redirect()->route('screenings.index');
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Screening $screening, Request $request)
    {
        return \inertia('Screenings/Edit', [
            'screening' => $screening,
            'type' => $request->type ?? 'P-4211'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ScreeningRequest $request, Screening $screening)
    {
        $screening->update($request->validated());

        return redirect()->route('screenings.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

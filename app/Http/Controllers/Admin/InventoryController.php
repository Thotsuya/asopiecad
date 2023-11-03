<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\InventoryResource;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;


class InventoryController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'   => 'required',
            'form_id' => ['required', 'exists:forms,id'],
            'project_id' => ['required', 'exists:projects,id'],
            'goal' => ['required','integer']
        ]);

        $inventory = Inventory::create($validated);

        return redirect()->route('projects.show', $inventory->project->uuid);
    }

    public function show(Inventory $inventory)
    {
        return inertia('Inventory/Show', [
            'inventory' => InventoryResource::make($inventory->load([
                'form' => function ($query) {
                    $query->with(['tabs','fields']);
                },
                'inventoryItems'
            ])),
        ]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\InventoryItemRequest;
use App\Models\InventoryItem;
use Illuminate\Http\Request;

class InventoryItemController extends Controller
{
    public function store(InventoryItemRequest $request){

        $inventoryItem = InventoryItem::create([
            'title' => $request->validated()['title'],
            'inventory_id' => $request->validated()['inventory_id'],
            'form_data' => collect($request->validated())->except(['title','form_id','inventory_id'])->toArray()
        ]);

        return redirect()->route('inventory.show', $inventoryItem->inventory->uuid);
    }

    public function update(InventoryItem $inventoryItem,InventoryItemRequest $request)
    {

        $inventoryItem->update([
            'form_data' => collect($request->validated())->except(['title','form_id','inventory_id'])->toArray()
        ]);

        return redirect()->route('inventory.show', $inventoryItem->inventory->uuid);
    }
}

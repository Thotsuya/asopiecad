<?php
namespace App\Traits;

trait FieldFormatter {

    public function formatFields($request){

        return collect($request->validated()['tabs'])->map(function ($tab) use ($request) {
            return [
                'tab_id' => $tab['id'],
                'tab_name' => $tab['name'],
                'tab_slug' => $tab['slug'],
                'editMode' => false,
                'order' => $tab['order'],
                'fields' => // Group fields whose tab_id is equal to the current tab_id
                    collect($request->validated()['fields'])->filter(function ($field) use ($tab) {
                        // Convert the field's tab_id to an integer
                        $field_tab_id = (int)$field['tab_id'];
                        return $field_tab_id === $tab['id'];
                    })
            ];
        });
    }

}

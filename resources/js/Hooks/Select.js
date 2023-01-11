import { useEffect } from "react";

export default function useSelect({
    el,
    onChange,
    onRemove,
    options,
    selected,
    placeholder = "Selecciona los formularios que componen el proyecto",
}) {
    useEffect(() => {
        // Initialize Select 2
        $(el).select2({
            placeholder: placeholder,
            width: "100%",
            multiple: true,
        });

        // Set selected options
        $(el).val(selected).trigger("change");

        // Listen for changes
        $(el).on("select2:select", function (e) {
            let data = e.params.data;
            onChange(data.id);
        });

        // Listen for removal
        $(el).on("select2:unselect", function (e) {
            let data = e.params.data;
            onRemove(data.id);
        });
    });
}

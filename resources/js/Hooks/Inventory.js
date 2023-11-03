import useToasts from "@/Hooks/Toasts";
import {useForm} from "@inertiajs/inertia-react";
import {useState} from "react";

export default function useInventory(
    inventory,
    form,
) {
    const { success, error } = useToasts()
    const [editMode, setEditMode] = useState(false)

    const { data, setData, post, put, processing, errors, reset, isDirty, wasSuccessful } = useForm(() => {
        const formData = {}

        formData['title'] = inventory.title
        formData['inventory_id'] = inventory.id
        formData['form_id'] = form.id
        formData['inventory_item_id'] = null

        form.tabs.forEach((tab) => {
            tab.fields.forEach((field) => {
                formData[`${field.slug}-${form.form_slug}-${form.id}`] =
                    fieldType(field)
            })
        })

        return formData
    })

    function fieldType(field) {
        if (field.type === 'checkbox' || field.type === 'radio') return false
        if (field.type === 'select') return field.options[0].value
        if (field.type === 'select multiple') return []
        if (field.type === 'text' || field.type === 'textarea') return ''
        if (field.type === 'number') return 0
        if (field.type === 'date') return new Date().toISOString().slice(0, 10)
        if (field.type === 'file') return null // TODO: Handle file uploads
        if (field.type === 'datetime local')
            return new Date().toISOString().slice(0, 16)
        if (field.type === 'time') return new Date().toISOString().slice(11, 16)
        if (field.type === 'color') return '#000000'
        if (field.type === 'range') return 0
        return ''
    }

    function calculateSimilarity(str1 = "", str2 = "") {
        let longer = str1.trim();
        let shorter = str2.trim();

        let a1 = longer.toLowerCase().split(" ");
        let b1 = shorter.toLowerCase().split(" ");
        let result = a1.every((aa, i) => aa[0] === b1[i][0]);

        if (longer.length < shorter.length)  [longer,shorter] = [shorter,longer];

        let arr = [];
        let count = 0;
        for(let i = 0;i<longer.length;i++){
            if(shorter && shorter.includes(longer[i])) {
                shorter = shorter.replace(longer[i],"")
                count++
            }
        }

        return {
            score : (count*100)/longer.length,
            result
        }
    }

    const storeInventory = () => {
        post(route('inventory-items.store'), {
            preserveScroll: true,
            onSuccess: () => {
                success('Inventario guardado con exito.')
                reset()
            },
            onError: () => {
                error('Error al guardar el inventario.')
            },
        })
    }


    const updateInventory = () => {
        put(route('inventory-items.update', data.inventory_item_id), {
            preserveScroll: true,
            onSuccess: () => {
                success('Inventario actualizado con exito.')
                setEditMode(false)
                reset()
            },
            onError: () => {
                error('Error al actualizar el inventario.')
            },
        })
    }




    return {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
        calculateSimilarity,
        isDirty,
        wasSuccessful,
        editMode,
        setEditMode,
        storeInventory,
        updateInventory
    }

}

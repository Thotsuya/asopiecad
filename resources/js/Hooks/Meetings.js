import useToasts from "@/Hooks/Toasts";
import {useForm} from "@inertiajs/inertia-react";

export default function useMeetings(
    meeting,
    form,
) {
    const { success, error } = useToasts()

    const { data, setData, post, put, processing, errors, reset, isDirty } = useForm(() => {
        const formData = {}

        formData['title'] = meeting.title
        formData['meeting_id'] = meeting.id
        formData['form_id'] = form.id

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

    const storeMeeting = (e) => {
        e.preventDefault()
        post(route('participants.store'), {
            preserveScroll: true,
            onSuccess: () => {
                success('Reunion guardada correctamente.')
            },
            onError: () => {
                error('No se pudo guardar la reunion.')
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
        storeMeeting
    }

}

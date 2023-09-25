import { useForm } from '@inertiajs/inertia-react'
import useToasts from '@/Hooks/Toasts'

export default function useBenefitiaries(
    forms,
    isNew = false,
    project = null,
    beneficiary = null,
    programs = null,
    previous_route = null
) {
    const { success, error } = useToasts()
    const { data, setData, post, put, processing, errors, reset, isDirty } =
        useForm(() => {
            // Loop through the form fields, create an object with the field slug as the key and the value as the value
            const formData = {}

            formData['name'] = isNew ? beneficiary : beneficiary.name
            formData['forms'] = forms
            formData['programs'] = programs
            formData['approve'] = false
            formData['previous_route'] = previous_route

            forms.forEach((form) => {
                form.tabs.forEach((tab) => {
                    tab.fields.forEach((field) => {
                        formData[`${field.slug}-${form.form_slug}-${form.id}`] =
                            fieldType(field)
                    })
                })
            })
            return formData
        })

    const handleSubmit = (e) => {
        if (isNew) {
            post(route('projects.forms.store', { project: project.uuid }), {
                preserveScroll: true,
                onSuccess: () => {
                    success('Beneficiario creado con éxito')
                    reset()
                },
            })
        } else {
            put(
                route('projects.forms.update', {
                    project: project.uuid,
                    beneficiary: beneficiary.uuid,
                }),
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        success('Beneficiario actualizado con éxito')
                    },
                }
            )
        }
    }

    const handleSubmitUpdate = (approve = false) => {
        put(
            route('projects.forms.update', {
                project: project.uuid,
                beneficiary: beneficiary.uuid,
                approve
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    success('Beneficiario actualizado con éxito')
                },
            }
        )
    }

    const handleSubmitForDataOnly = (approve = false) => {

        data.approve = approve;

        if (isNew) {
            post(route('beneficiaries.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    success('Beneficiario creado con éxito')
                    reset()
                },
            })
        } else {
            put(route('beneficiaries.update', beneficiary.uuid), {
                preserveScroll: true,
                onSuccess: () => {
                    success('Beneficiario actualizado con éxito')
                },
            })
        }
    }

    function fieldType(field) {
        if (field.type === 'checkbox' || field.type === 'radio') return false
        if (field.type === 'select') return ''
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

    return {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        handleSubmit,
        calculateSimilarity,
        isDirty,
        handleSubmitUpdate,
        handleSubmitForDataOnly,
    }
}

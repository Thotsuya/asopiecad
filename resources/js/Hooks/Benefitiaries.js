import { useForm } from '@inertiajs/inertia-react'
import useToasts from '@/Hooks/Toasts'

export default function useBenefitiaries(
    forms,
    isNew = false,
    project = null,
    beneficiary = null
) {
    const { success, error } = useToasts()
    const { data, setData, post, put, processing, errors, reset, isDirty } =
        useForm(() => {
            // Loop through the form fields, create an object with the field slug as the key and the value as the value
            const formData = {}

            formData['name'] = isNew ? beneficiary : beneficiary.name
            formData['forms'] = forms
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

    const handleSubmitUpdate = () => {
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

    const handleSubmitForDataOnly = () => {
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

    return {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        handleSubmit,
        isDirty,
        handleSubmitUpdate,
        handleSubmitForDataOnly,
    }
}

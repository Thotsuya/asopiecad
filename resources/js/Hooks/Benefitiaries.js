import { useForm } from '@inertiajs/inertia-react'
import useToasts from '@/Hooks/Toasts'

export default function useBenefitiaries(
    forms,
    isNew = false,
    project,
    beneficiary = null
) {
    const { success, error } = useToasts()
    const { data, setData, post, put, processing, errors, reset, isDirty } =
        useForm(() => {
            // Loop through the form fields, create an object with the field slug as the key and the value as the value
            const formData = {}
            formData['name'] = isNew ? beneficiary : beneficiary.name
            forms.forEach((form) => {
                form.tabs.forEach((tab) => {
                    tab.fields.forEach((field) => {
                        if (
                            field.type === 'checkbox' ||
                            field.type === 'radio'
                        ) {
                            formData[
                                `${field.slug}-${form.form_slug}-${form.id}`
                            ] = false
                        } else if (field.type === 'select') {
                            formData[
                                `${field.slug}-${form.form_slug}-${form.id}`
                            ] = field.options[0].value
                        } else if (field.type === 'select multiple') {
                            formData[
                                `${field.slug}-${form.form_slug}-${form.id}`
                            ] = []
                        } else if (
                            field.type === 'text' ||
                            field.type === 'textarea'
                        ) {
                            formData[
                                `${field.slug}-${form.form_slug}-${form.id}`
                            ] = ''
                        } else if (field.type === 'number') {
                            formData[
                                `${field.slug}-${form.form_slug}-${form.id}`
                            ] = 0
                        } else {
                            formData[
                                `${field.slug}-${form.form_slug}-${form.id}`
                            ] = ''
                        }
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
    }
}

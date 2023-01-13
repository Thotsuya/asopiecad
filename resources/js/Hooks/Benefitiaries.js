import { useForm } from '@inertiajs/inertia-react'

export default function useBenefitiaries(forms, isNew = false, project) {
    const { data, setData, post, put, processing, errors, reset } = useForm(
        () => {
            // Loop through the form fields, create an object with the field slug as the key and the value as the value
            const formData = {}
            forms.forEach((form) => {
                form.tabs.forEach((tab) => {
                    tab.fields.forEach((field) => {
                        if (field.type === 'checkbox') {
                            formData[
                                `${field.slug}-${form.form_slug}-${form.id}`
                            ] = false
                        } else if (field.type === 'radio') {
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
        }
    )

    const handleSubmit = (e) => {
        if (isNew) {
            post(route('projects.forms.store', { project: project.uuid }))
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
    }
}

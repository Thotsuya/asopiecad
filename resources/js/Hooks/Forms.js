import { useRef, useState } from 'react'
import useToasts from '@/Hooks/Toasts'
import { useForm } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

export default function useUserForms() {
    const [option, setOption] = useState('')
    const [tab, setTab] = useState('')
    const optionInputRef = useRef()
    const tabInputRef = useRef()
    const [loading, setLoading] = useState(false)

    const { success, error } = useToasts()

    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: null,
        form_name: '',
        tabs: [],
        fields: [],
    })

    const [field, setField] = useState({
        name: '',
        type: 'text',
        required: false,
        size: 'col-xs-12 col-sm-6 col-md-4 col-lg-3',
        tab_id: data.tabs.length > 0 ? data.tabs[0].id : '1',
        options: [],
    })

    const handleFormSubmit = (e) => {
        post(route('forms.store'), {
            onSuccess: () => {
                success('Formulario creado correctamente')
            },
            onError: () => {
                error('Error al crear el formulario')
            },
        })
    }

    const normalizeText = (text) => {
        // Remove special characters and symbols
        return text
            .toLowerCase()
            .replace(/\s/g, '-')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/ñ/g, 'n')
            .replace(/[^a-zA-Z0-9-]/g, '')
    }

    const addTabToForm = () => {
        if (tab === '') return

        // remove spaces
        // replace accents with their non-accented equivalent
        // replace non-alphanumeric characters with a space
        // replace ñ with n
        let tabSlug = normalizeText(tab)

        setData({
            ...data,
            tabs: [
                ...data.tabs,
                {
                    id:
                        data.tabs.length > 0
                            ? parseInt(data.tabs[data.tabs.length - 1].id) + 1
                            : 1,
                    name: tab,
                    slug: tabSlug,
                    editMode: false,
                    order:
                        data.tabs.length > 0
                            ? data.tabs[data.tabs.length - 1].order + 1
                            : 1,
                },
            ],
        })
        setTab('')
        tabInputRef.current.focus()
    }

    const toggleTabEditMode = (tabId) => {
        setData({
            ...data,
            tabs: data.tabs.map((tab) => {
                if (tab.id === tabId) {
                    tab.editMode = !tab.editMode
                }

                return tab
            }),
        })
    }

    const toggleOptionEditMode = (optionId) => {
        setField((field) => {
            return {
                ...field,
                options: field.options.map((option) => {
                    if (option.id === optionId) {
                        option.editMode = !option.editMode
                    }

                    return option
                }),
            }
        })
    }

    const handleTabEdit = (tabId, newName) => {
        setData({
            ...data,
            tabs: data.tabs.map((tab) => {
                if (tab.id === tabId) {
                    tab.name = newName
                }

                return tab
            }),
        })
    }

    const handleOptionEdit = (optionId, newName) => {
        setField((field) => {
            return {
                ...field,
                options: field.options.map((option) => {
                    if (option.id === optionId) {
                        option.name = newName
                    }

                    return option
                }),
            }
        })
    }

    const handleTabChange = (e) => {
        setTab(e.target.value)
    }

    const handleFieldChange = (e) => {
        setField({
            ...field,
            [e.target.name]:
                e.target.type === 'checkbox'
                    ? e.target.checked
                    : e.target.value,
        })
    }

    const handleOptionChange = (e) => {
        setOption(e.target.value)
    }

    const handleFieldOptionsChange = (e) => {
        let OptionValue = normalizeText(option)

        setField({
            ...field,
            // Keep the old options and add the new one
            options: [
                ...field.options,
                {
                    // Get the last option id and add 1 or 1 if there is no options
                    id:
                        field.options.length > 0
                            ? field.options[field.options.length - 1].id + 1
                            : field.options.length + 1,
                    name: option,
                    value: `${OptionValue}-${field.options.length + 1}`,
                    order: field.options.length + 1,
                    editMode: false,
                },
            ],
        })
        // Clear the option input
        setOption('')
        optionInputRef.current.focus()
    }

    const addFieldToForm = (e) => {
        let fieldSlug = normalizeText(field.name)
        fieldSlug = fieldSlug.replace(/[\u0300-\u036f]/g, '')
        fieldSlug = fieldSlug.replace(/ñ/g, 'n')

        setData({
            ...data,
            fields: [
                ...data.fields,
                {
                    ...field,
                    slug: fieldSlug,
                    id:
                        data.fields.length > 0
                            ? data.fields[data.fields.length - 1].id + 1
                            : 1,
                },
            ],
        })

        setField({
            name: '',
            type: 'text',
            required: false,
            size: 'col-xs-12 col-sm-6 col-md-4 col-lg-3',
            tab_id: '1',
            options: [],
        })
    }

    const storeFieldToTab = () => {
        Inertia.post(route('tabs.fields.store', data.tabs[0].id), field, {
            onBefore: () => {
                setLoading(true)
            },
            onSuccess: () => {
                success('Campo creado correctamente')
            },
            onError: () => {
                error('Error al crear el campo')
            },
            onFinish: () => {
                setLoading(false)
            },
        })
    }

    const removeOptionFromField = (option) => {
        setField({
            ...field,
            options: field.options
                .filter((item) => item.id !== option.id)
                .map((item, index) => {
                    return { ...item, order: index + 1 }
                })
                .sort((a, b) => a.order - b.order),
        })
    }

    const removeTabFromForm = (tab) => {
        setData({
            ...data,
            tabs: data.tabs
                .filter((item) => item.id !== tab.id)
                .map((item, index) => {
                    return { ...item, order: index + 1 }
                })
                .sort((a, b) => a.order - b.order),
        })
    }

    const removeFieldFromForm = (field) => {
        setData({
            ...data,
            fields: data.fields.filter((item) => item.id !== field.id),
        })
    }

    const buttonEnabled = () => {
        return (
            field.name === '' ||
            field.type === '' ||
            field.size === '' ||
            field.tab_id === '' ||
            ((field.type === 'select' || field.type === 'select multiple') &&
                field.options.length === 0) ||
            loading
        )
    }

    // Function to update options order on drop
    const handleDrop = (droppedItem) => {
        if (!droppedItem.destination) return

        let updatedOptions = [...field.options]
        const [removed] = updatedOptions.splice(droppedItem.source.index, 1)

        updatedOptions.splice(droppedItem.destination.index, 0, removed)

        setField({
            ...field,
            options: updatedOptions.map((item, index) => {
                return { ...item, order: index + 1 }
            }),
        })
    }

    const handleTabDrop = (droppedItem) => {
        if (!droppedItem.destination) return

        let updatedTabs = [...data.tabs]
        const [removed] = updatedTabs.splice(droppedItem.source.index, 1)

        updatedTabs.splice(droppedItem.destination.index, 0, removed)

        setData({
            ...data,
            tabs: updatedTabs.map((item, index) => {
                return { ...item, order: index + 1 }
            }),
        })
    }

    const handleFormEditSubmit = (e) => {
        put(route('forms.update', { form: data.id }), {
            onSuccess: (data) => {
                success('Form updated successfully')
            },
            onError: (err) => {
                error('Error updating form')
            },
        })
    }

    return {
        option,
        setOption,
        tab,
        setTab,
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        optionInputRef,
        success,
        error,
        field,
        setField,
        handleFormSubmit,
        handleTabChange,
        handleFieldChange,
        handleOptionChange,
        handleFieldOptionsChange,
        addFieldToForm,
        removeOptionFromField,
        removeTabFromForm,
        removeFieldFromForm,
        buttonEnabled,
        handleDrop,
        handleTabDrop,
        toggleTabEditMode,
        toggleOptionEditMode,
        handleTabEdit,
        handleOptionEdit,
        addTabToForm,
        handleFormEditSubmit,
        tabInputRef,
        storeFieldToTab,
        loading,
    }
}

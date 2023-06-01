import { useForm } from '@inertiajs/inertia-react'
import useToasts from '@/Hooks/Toasts'

export default function useFilters() {
    const { success, error } = useToasts()

    const filters = [
        {
            id: 1,
            label: 'Nombre del Beneficiario',
            value: 'name',
        },
        {
            id: 2,
            label: 'Código del Beneficiario',
            value: 'code',
        },
        {
            id: 3,
            label: 'Proyecto',
            value: 'project_id',
        },
        {
            id: 4,
            label: 'Formulario',
            value: 'form_id',
        },
        {
            id: 5,
            label: 'Fecha de Creación',
            value: 'created_at'
        }

    ]

    const { data, setData, get, processing, reset, errors } = useForm({
        filter: '',
        value: '',
        form_id: 1,
        field_id: '',
        field_type: '',
        operator: '',
        from: new Date().toISOString().slice(0, 10),
        to: new Date().toISOString().slice(0, 10),
    })

    const handleSearch = () => {
        get(route('beneficiaries.index'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                success('Filtro aplicado con éxito')
            },
            onError: (err) => {
                console.log(err)
                error('No se pudo aplicar el filtro')
            },
        })
    }

    return {
        filters,
        data,
        setData,
        processing,
        reset,
        errors,
        handleSearch,
    }
}

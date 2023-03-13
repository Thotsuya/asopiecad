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
    ]

    const { data, setData, get, processing, reset, errors } = useForm({
        filter: '',
        value: '',
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

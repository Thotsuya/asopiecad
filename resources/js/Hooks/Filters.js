import {useForm} from '@inertiajs/inertia-react'
import useToasts from '@/Hooks/Toasts'
import {Inertia} from "@inertiajs/inertia";
import {useState} from "react";

export default function useFilters() {
    const {success, error} = useToasts()
    const [exporting, setExporting] = useState(false)
    const [loading, setLoading] = useState(false)

    const filters = [
        {
            id: 1,
            label: 'Nombre del Participante',
            value: 'name',
        },
        {
            id: 2,
            label: 'Código del Participante',
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
        },
        {
            id: 6,
            label: 'Creador',
            value: 'created_by'
        }

    ]

    const statusFilters = [
        {
            id: 1,
            label: 'Todos',
            value: '',
        },
        {
            id: 2,
            label: 'Aprobado',
            value: 'approved',
        },
        {
            id: 3,
            label: 'Pendiente de Aprobación',
            value: 'pending',
        }
    ]

    const {data, setData, get, processing, reset, errors} = useForm({
        filter: '',
        value: '',
        program_id: '',
        form_id: 1,
        field_id: '',
        field_type: '',
        operator: '',
        from: new Date().toISOString().slice(0, 10),
        to: new Date().toISOString().slice(0, 10),
        status: '',
    })

    const handleSearch = () => {
        Inertia.get(route('beneficiaries.index'), data, {
            preserveScroll: true,
            onSuccess: () => {
                success('Filtro aplicado con éxito')
            },
            onError: (err) => {
                console.log(err)
                error('No se pudo aplicar el filtro')
            },
        })
    }

    const exportToExcel = () => {
        Inertia.post(route('beneficiaries.export'), data, {
            preserveScroll: true,
            preserveState: true,
            onBefore: () => {
                setExporting(false)
                setLoading(true)
            },
            onSuccess: () => {
                success('Exportando datos...')
                setExporting(true)
                setLoading(false)
            },
            onError: (err) => {
                console.log(err)
                error('No se pudo exportar los datos')
                setExporting(false)
            }
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
        statusFilters,
        exportToExcel,
        exporting,
        loading
    }
}

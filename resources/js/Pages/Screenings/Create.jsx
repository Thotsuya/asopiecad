import { Head, useForm } from '@inertiajs/inertia-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Registrant from '@/Pages/Screenings/Partials/Registrant'
import Screened from '@/Pages/Screenings/Partials/Screened'
import useToasts from '@/Hooks/Toasts'

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        department: 'managua',
        municipality: null,
        date_of_screening: new Date().toISOString().split('T')[0],
        registrant_name: '',
        name: '',
        age: '',
        gender: '',

        communication_level_1: 0,
        communication_level_2: 0,
        communication_level_3: 0,
        communication_level_4: 0,
        communication_level_5: 0,
        communication_level_6: 0,

        wide_movements_level_1: 0,
        wide_movements_level_2: 0,
        wide_movements_level_3: 0,
        wide_movements_level_4: 0,
        wide_movements_level_5: 0,
        wide_movements_level_6: 0,

        fine_movements_level_1: 0,
        fine_movements_level_2: 0,
        fine_movements_level_3: 0,
        fine_movements_level_4: 0,
        fine_movements_level_5: 0,
        fine_movements_level_6: 0,

        problem_solving_level_1: 0,
        problem_solving_level_2: 0,
        problem_solving_level_3: 0,
        problem_solving_level_4: 0,
        problem_solving_level_5: 0,
        problem_solving_level_6: 0,

        social_individual_level_1: 0,
        social_individual_level_2: 0,
        social_individual_level_3: 0,
        social_individual_level_4: 0,
        social_individual_level_5: 0,
        social_individual_level_6: 0,
    })

    const { success, error } = useToasts()

    const handleFormSubmit = () => {
        post(route('screenings.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                success('Tamizaje registrado con éxito')
            },
            onError: (e) => {
                console.log(e)
                error('Error al crear el tamizaje')
            },
        })
    }

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Registrar Tamizaje" />

            <h1 className="page-title">Registrar Tamizaje</h1>

            <Registrant data={data} setData={setData} auth={auth} />

            <Screened
                data={data}
                setData={setData}
                handleSubmit={handleFormSubmit}
                processing={processing}
            />
        </AuthenticatedLayout>
    )
}

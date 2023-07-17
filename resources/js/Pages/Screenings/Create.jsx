import { Head, useForm } from '@inertiajs/inertia-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Registrant from '@/Pages/Screenings/Partials/Registrant'
import Screened from '@/Pages/Screenings/Partials/Screened'
import useToasts from '@/Hooks/Toasts'
import ScreenedP4353 from "@/Pages/Screenings/Partials/ScreenedP4353";

export default function Create({ auth, type }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        department: 'managua',
        municipality: null,
        date_of_screening: new Date().toISOString().split('T')[0],
        registrant_name: '',
        name: '',
        age: '',
        gender: '',
        type: type,

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

        //P-4353
        first_name: '',
        second_name: '',
        first_surname: '',
        second_surname: '',
        //gender
        //age
        disability_yes_no: 'si-1',
        disability_type: [],
        date_of_birth: new Date().toISOString().split('T')[0],
        document: '',
        address: '',
        screened_deparment: 'managua',
        screened_municipality: '',
        screened_phone_number: '',
        screened_visual_acuity: '',
        screened_refered: '',
        screened_observations: '',
        screened_visual_acuity_right: '',
        screened_visual_acuity_left: '',
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

            <h1 className="page-title">Registrar Tamizaje - {type}</h1>

            <Registrant data={data} setData={setData} auth={auth} />

            {type === 'P-4211' && (
                <Screened
                    data={data}
                    setData={setData}
                    handleSubmit={handleFormSubmit}
                    processing={processing}
                />
            )}

            {type === 'P-4353' && (
                <ScreenedP4353
                    data={data}
                    setData={setData}
                    handleSubmit={handleFormSubmit}
                    processing={processing}
                />
            )}
        </AuthenticatedLayout>
    )
}

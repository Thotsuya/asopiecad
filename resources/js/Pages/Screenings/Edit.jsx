import { Head, useForm } from '@inertiajs/inertia-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Registrant from '@/Pages/Screenings/Partials/Registrant'
import Screened from '@/Pages/Screenings/Partials/Screened'
import useToasts from '@/Hooks/Toasts'
import { useEffect } from 'react'
import ScreenedP4353 from "@/Pages/Screenings/Partials/ScreenedP4353";

export default function Edit({ screening, auth, type }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        department: screening.department,
        municipality: screening.municipality,
        date_of_screening: screening.date_of_screening,
        name: screening.name,
        registrant_name: screening.registrant_name,
        age: screening.age,
        gender: screening.gender,

        communication_level_1: screening.communication_level_1,
        communication_level_2: screening.communication_level_2,
        communication_level_3: screening.communication_level_3,
        communication_level_4: screening.communication_level_4,
        communication_level_5: screening.communication_level_5,
        communication_level_6: screening.communication_level_6,

        wide_movements_level_1: screening.wide_movements_level_1,
        wide_movements_level_2: screening.wide_movements_level_2,
        wide_movements_level_3: screening.wide_movements_level_3,
        wide_movements_level_4: screening.wide_movements_level_4,
        wide_movements_level_5: screening.wide_movements_level_5,
        wide_movements_level_6: screening.wide_movements_level_6,

        fine_movements_level_1: screening.fine_movements_level_1,
        fine_movements_level_2: screening.fine_movements_level_2,
        fine_movements_level_3: screening.fine_movements_level_3,
        fine_movements_level_4: screening.fine_movements_level_4,
        fine_movements_level_5: screening.fine_movements_level_5,
        fine_movements_level_6: screening.fine_movements_level_6,

        problem_solving_level_1: screening.problem_solving_level_1,
        problem_solving_level_2: screening.problem_solving_level_2,
        problem_solving_level_3: screening.problem_solving_level_3,
        problem_solving_level_4: screening.problem_solving_level_4,
        problem_solving_level_5: screening.problem_solving_level_5,
        problem_solving_level_6: screening.problem_solving_level_6,

        social_individual_level_1: screening.social_individual_level_1,
        social_individual_level_2: screening.social_individual_level_2,
        social_individual_level_3: screening.social_individual_level_3,
        social_individual_level_4: screening.social_individual_level_4,
        social_individual_level_5: screening.social_individual_level_5,
        social_individual_level_6: screening.social_individual_level_6,

        //P-4353
        first_name: screening.first_name,
        second_name: screening.second_name,
        first_surname: screening.first_surname,
        second_surname: screening.second_surname,
        //gender
        //age
        disability_yes_no: screening.disability_yes_no,
        disability_type: screening.disability_type,
        date_of_birth: screening.date_of_birth,
        document: screening.document,
        address: screening.address,
        screened_deparment: screening.screened_deparment,
        screened_municipality: screening.screened_municipality,
        screened_phone_number: screening.screened_phone_number,
        screened_visual_acuity: screening.screened_visual_acuity,
        screened_refered: screening.screened_refered,
        screened_observations: screening.screened_observations,
        screened_visual_acuity_right: screening.screened_visual_acuity_right,
        screened_visual_acuity_left: screening.screened_visual_acuity_left,

        institution: screening.institution,
        application_month: screening.application_month,
        type: screening.type,
    })

    const { success, error } = useToasts()

    const handleFormSubmit = () => {
        put(route('screenings.update', screening.uuid), {
            preserveScroll: true,
            onSuccess: () => {
                success('Tamizaje actualizado correctamente')
            },
            onError: (err) => {
                console.log(err)
                error('Error al actualizar el tamizaje')
            },
        })
    }

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Editar Tamizaje" />

            <h1 className="page-title">Editar Tamizaje - {type}</h1>

            <Registrant
                type={type}
                data={data} setData={setData} auth={auth} />

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

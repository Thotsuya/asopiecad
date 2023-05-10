import { Head, useForm } from '@inertiajs/inertia-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import GenderChart from '@/Pages/Screenings/Charts/GenderChart'
import DepartmentChart from '@/Pages/Screenings/Charts/DepartmentChart'
import AgeChart from '@/Pages/Screenings/Charts/AgeChart'

export default function Create(props) {
    return (
        <AuthenticatedLayout auth={props.auth}>
            <Head title="Reporte Tamizajes" />

            <h1 className="page-title">Reporte Tamizajes</h1>

            <div className="row">
                <GenderChart
                    screenings_per_gender={props.screenings_per_gender}
                />
                <DepartmentChart
                    screenings_per_department={props.screenings_per_department}
                />

                <AgeChart screenings_per_age={props.screenings_per_age} />
            </div>
        </AuthenticatedLayout>
    )
}

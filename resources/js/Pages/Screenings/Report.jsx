import { Head, useForm } from '@inertiajs/inertia-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import GenderChart from '@/Pages/Screenings/Charts/GenderChart'
import DepartmentChart from '@/Pages/Screenings/Charts/DepartmentChart'
import AgeChart from '@/Pages/Screenings/Charts/AgeChart'
import Select from "react-select";
import {Inertia} from "@inertiajs/inertia";

export default function Create(props) {

    const projects = [
        {value: 'P-4211', label: 'P-4211'},
        {value: 'P-4353', label: 'P-4353'},
    ]

    const handleProjectChange = (selectedOption) => {
        Inertia.get(route('screenings.report'), {project: selectedOption.value})
    }

    return (
        <AuthenticatedLayout auth={props.auth}>
            <Head title="Reporte Tamizajes" />

            <h1 className="page-title">Reporte Tamizajes</h1>

            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="project">Proyecto</label>
                        <Select
                            id="project"
                            name="project"
                            options={projects}
                            onChange={handleProjectChange}
                            defaultValue={projects[0]}
                        />
                    </div>

                </div>
            </div>

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

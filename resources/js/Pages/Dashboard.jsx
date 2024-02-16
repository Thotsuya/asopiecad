import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/inertia-react'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

export default function Dashboard({
    auth,
    screenings_per_year_by_month,
    total_screenings,
    total_beneficiaries,
    total_projects,
    incoming_appointments,
    latest_screenings,
    labels,
    datasets,
}) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Tamizajes por año',
            },
        },
    }

    const data = {
        labels: labels,
        datasets: datasets,
    }

    return (
        <AuthenticatedLayout auth={auth}>
            {console.log(data)}
            <Head title="Dashboard" />

            <div className="row">
                <div className="col-lg-3 col-xs-12">
                    <div className="box-content">
                        <div className="statistics-box with-icon">
                            <i className="ico ti-user text-success" />
                            <h2 className="counter text-success">
                                {total_screenings}
                            </h2>
                            <p>Tamizajes</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-12">
                    <div className="box-content">
                        <div className="statistics-box with-icon">
                            <i className="ico fa fa-users text-primary" />
                            <h2 className="counter text-primary">
                                {total_beneficiaries}
                            </h2>
                            <p>Participantes</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-xs-12">
                    <div className="box-content">
                        <div className="statistics-box with-icon">
                            <i className="ico fa fa-book text-warning" />
                            <h2 className="counter text-warning">
                                {total_projects}
                            </h2>
                            <p>Proyectos</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-xs-12">
                    <div className="box-content">
                        <div className="statistics-box with-icon">
                            <i className="ico fa fa-calendar text-danger" />
                            <h2 className="counter text-danger">
                                {incoming_appointments.length}
                            </h2>
                            <p>Visitas Próximas</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="box-content">
                        <h4 className="box-title">Tamizajes por Mes y Año</h4>
                        <div className="row">
                            <div className="col-xs-12">
                                <Line
                                    datasetIdKey="id"
                                    options={options}
                                    data={data}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 col-xs-12">
                    <div className="box-content">
                        <h4 className="box-title">
                            Últimos Tamizajes Registrados
                        </h4>
                        <table className="table table-striped margin-bottom-10">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Edad</th>
                                    <th>Sexo</th>
                                    <th>Registrado Por</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {latest_screenings.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No hay tamizajes registrados
                                        </td>
                                    </tr>
                                )}

                                {latest_screenings.map((screening) => (
                                    <tr key={screening.id}>
                                        <td>{screening.name}</td>
                                        <td>{screening.age}</td>
                                        <td>{screening.gender}</td>
                                        <td>{screening?.user?.name}</td>
                                        <td>{screening.date_of_screening}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-lg-6 col-xs-12">
                    <div className="box-content">
                        <h4 className="box-title">
                            Proximas Visitas a Beneficiarios
                        </h4>
                        <table className="table table-striped margin-bottom-10">
                            <thead>
                                <tr>
                                    <th>Beneficiario</th>
                                    <th>Fecha de visita</th>
                                    <th>Próxima visita</th>
                                </tr>
                            </thead>
                            <tbody>
                                {incoming_appointments.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            No hay visitas próximas
                                        </td>
                                    </tr>
                                )}

                                {incoming_appointments.map((appointment) => (
                                    <tr key={appointment.id}>
                                        <td>{appointment.beneficiary}</td>
                                        <td>{appointment.start_date}</td>
                                        <td>{appointment.next_appointment}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

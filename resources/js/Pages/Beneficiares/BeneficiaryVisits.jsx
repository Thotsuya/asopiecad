import {Head} from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import {useState} from "react";
import AppointmentShowModal from "@/Components/Appointments/AppointmentShowModal";

export default function BeneficiaryVisits({auth, beneficiary, visits}) {

    const [selectedAppointment, setSelectedAppointment] = useState(null)

    return (
        <>
            <AuthenticatedLayout auth={auth}>
                <Head title="Visitas al Participante" />

                <div className="row">
                    <div className="col-xs-12">
                        <h3 className="page-title">
                            Visitas al Participante <strong>{beneficiary.name}</strong>
                        </h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="box-content">
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="box-content">
                                        <h4 className="box-title">Visitas</h4>
                                        <div className="table-responsive">
                                            <table className="table table-striped table-hover">
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Motivo</th>
                                                    <th>Fecha de visita</th>
                                                    <th>Proxima visita</th>
                                                    <th>Beneficiario</th>
                                                    <th>Registrado por</th>
                                                    <th>Acciones</th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {visits.total === 0 && (
                                                    <tr>
                                                        <td colSpan="7">
                                                            <div className="alert alert-info">
                                                                No hay visitas registradas
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                                {visits.data.map(
                                                    (appointment, index) => (
                                                        <tr key={appointment.id}>
                                                            <td>
                                                                {index *
                                                                    visits.current_page +
                                                                    1}
                                                            </td>
                                                            <td>{appointment.title}</td>
                                                            <td>
                                                                {appointment.formatted_date}
                                                            </td>
                                                            <td>
                                                                {
                                                                    appointment.next_appointment
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    beneficiary.name
                                                                }
                                                            </td>
                                                            <td>{appointment.user.name}</td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-primary btn-xs"
                                                                    onClick={() => {
                                                                        setSelectedAppointment(
                                                                            appointment
                                                                        )
                                                                    }}
                                                                    data-toggle="modal"
                                                                    data-target="#modal-show-visit"
                                                                >
                                                                    <i className="fa fa-eye" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <Pagination
                                            current_page={visits.current_page}
                                            next_page_url={visits.next_page_url}
                                            per_page={visits.per_page}
                                            total={visits.total}
                                            last_page={visits.last_page}
                                            prev_page_url={visits.prev_page_url}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </AuthenticatedLayout>
            <AppointmentShowModal appointment={selectedAppointment} />
        </>
    )
}

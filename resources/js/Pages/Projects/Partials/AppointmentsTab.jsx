import Pagination from '@/Components/Pagination'

export default function AppointmentsTab({
    appointments,
    onAppointmentSelected,
}) {
    return (
        <div
            className="tab-pane fade"
            role="tabpanel"
            id="appointments"
            aria-labelledby="profile-tab"
        >
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
                                    {appointments.total === 0 && (
                                        <tr>
                                            <td colSpan="7">
                                                <div className="alert alert-info">
                                                    No hay visitas registradas
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    {appointments.data.map(
                                        (appointment, index) => (
                                            <tr key={appointment.id}>
                                                <td>
                                                    {index *
                                                        appointments.current_page +
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
                                                        appointment.beneficiary
                                                            .name
                                                    }
                                                </td>
                                                <td>{appointment.user.name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary btn-xs"
                                                        onClick={() => {
                                                            onAppointmentSelected(
                                                                appointment
                                                            )
                                                        }}
                                                        data-toggle="modal"
                                                        data-target="#modal-show-visit"
                                                    >
                                                        <i className="fa fa-eye" />
                                                    </button>
                                                    <button
                                                        className="btn btn-xs btn-info waves-effect waves-light"
                                                        onClick={() => {
                                                            onAppointmentSelected(
                                                                appointment
                                                            )
                                                        }}
                                                        data-toggle="modal"
                                                        data-target="#modal-edit-visit"
                                                    >
                                                        <i className="fa fa-pencil" />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            current_page={appointments.current_page}
                            next_page_url={appointments.next_page_url}
                            per_page={appointments.per_page}
                            total={appointments.total}
                            last_page={appointments.last_page}
                            prev_page_url={appointments.prev_page_url}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

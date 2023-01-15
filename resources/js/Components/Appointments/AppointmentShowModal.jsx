export default function AppointmentShowModal({ appointment }) {
    return (
        <div
            className="modal fade"
            id="modal-show-visit"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modal-show-visit-label"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            id="modal-show-visit-close"
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title" id="modal-show-visit-label">
                            Información de la visita{' '}
                            <i className="fa fa-calendar-check-o" />
                        </h4>
                    </div>
                    <div className="modal-body">
                        {appointment && (
                            <div className="row">
                                <div className="col-xs-12">
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <strong>Fecha de la visita:</strong>{' '}
                                            {appointment.date}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Motivo:</strong>{' '}
                                            {appointment.title}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Beneficiario:</strong>{' '}
                                            {appointment.beneficiary.name}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Registrada por:</strong>{' '}
                                            {appointment.user.name}
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-xs-12">
                                    <h4>Comentarios</h4>
                                </div>
                                <div className="col-xs-12">
                                    {appointment.comments.length === 0 && (
                                        <div className="alert alert-info">
                                            No hay comentarios registrados
                                        </div>
                                    )}
                                    {appointment.comments.map(
                                        (comment, index) => (
                                            <div
                                                className="alert alert-info"
                                                key={index}
                                            >
                                                <strong>
                                                    <i className="fa fa-user"></i>{' '}
                                                    {comment.user}
                                                </strong>
                                                <p>{comment.comment}</p>
                                                <p>
                                                    Publicado el{' '}
                                                    <b>
                                                        {new Date(
                                                            comment.date
                                                        ).toLocaleString()}
                                                    </b>
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-default btn-sm waves-effect waves-light"
                            data-dismiss="modal"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

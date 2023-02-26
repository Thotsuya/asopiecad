export default function GlobalGoalModal({ project, forms }) {
    return (
        <div
            className="modal fade"
            id="modal-register-goal-global"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modal-register-goal-global-label"
        >
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            id="modal-register-goal-global-close"
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4
                            className="modal-title"
                            id="modal-register-goal-global-label"
                        >
                            Registrar nuevo objetivo global{' '}
                            <i className="fa fa-flag-checkered" />
                        </h4>
                    </div>

                    <div className="modal-body"></div>

                    <div className="modal-footer">
                        <button
                            id="modal-register-goal-global-close"
                            type="button"
                            className="btn btn-default"
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

import useProgress from '@/Hooks/Progress'
export default function GoalsProgressModal({ goal }) {
    const {
        data,
        setData,
        progress,
        errors,
        processing,
        handleProgressSubmit,
    } = useProgress(goal)

    return (
        <div
            className="modal fade"
            id="modal-register-goal-progress"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modal-register-goal-progress-label"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            id="modal-register-goal-progress-close"
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4
                            className="modal-title"
                            id="modal-register-goal-progress-label"
                        >
                            Registrar progreso para el objetivo{' '}
                            <i className="fa fa-flag" />
                        </h4>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xs-12">
                                <div
                                    className={`form-group ${
                                        errors.goal_progress ? 'has-error' : ''
                                    }`}
                                >
                                    <label htmlFor="goal-progress">
                                        Progreso
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="goal-progress"
                                        name="goal_progress"
                                        value={data.goal_progress}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                goal_progress: e.target.value,
                                            })
                                        }
                                    />
                                    {errors.goal_progress && (
                                        <span className="help-block">
                                            {errors.goal_progress}
                                        </span>
                                    )}
                                </div>
                                <div
                                    className={`form-group ${
                                        errors.goal_description
                                            ? 'has-error'
                                            : ''
                                    }`}
                                >
                                    <label htmlFor="goal-description">
                                        Descripción
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="goal-description"
                                        name="goal_description"
                                        value={data.goal_description}
                                        style={{
                                            // Prevent resizing
                                            resize: 'none',
                                        }}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                goal_description:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                    {errors.goal_description && (
                                        <span className="help-block">
                                            {errors.goal_description}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-default btn-sm waves-effect waves-light"
                            data-dismiss="modal"
                        >
                            Cerrar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm waves-effect waves-light"
                            disabled={processing}
                            onClick={handleProgressSubmit}
                        >
                            {processing ? (
                                <>
                                    <i className="fa fa-spinner fa-spin" />{' '}
                                    Registrando...
                                </>
                            ) : (
                                'Registrar avance'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

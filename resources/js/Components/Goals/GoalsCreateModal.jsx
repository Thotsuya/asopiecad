import useGoals from '@/Hooks/Goals'
export default function GoalsCreateModal({ project }) {
    const { data, processing, errors, setData, handleGoalSubmit } =
        useGoals(project)
    return (
        <div
            className="modal fade"
            id="modal-register-goal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modal-register-goal-label"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            id="modal-register-goal-close"
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4
                            className="modal-title"
                            id="modal-register-goal-label"
                        >
                            Registrar nuevo objetivo{' '}
                            <i className="fa fa-flag" />
                        </h4>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xs-12">
                                <div
                                    className={
                                        errors.goal_description
                                            ? 'form-group has-error'
                                            : 'form-group'
                                    }
                                >
                                    <label htmlFor="goal_name">
                                        Descripcion del Objetivo
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="goal_name"
                                        placeholder="Escribe una breve descripcion del objetivo"
                                        value={data.goal_description}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                goal_description:
                                                    e.target.value,
                                            })
                                        }}
                                    />
                                    {errors.goal_description && (
                                        <span className="help-block">
                                            {errors.goal_description}
                                        </span>
                                    )}
                                </div>
                                <div
                                    className={
                                        errors.goal_target
                                            ? 'form-group has-error'
                                            : 'form-group'
                                    }
                                >
                                    <label htmlFor="goal_target">
                                        Meta numérica
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="goal_target"
                                        min={0}
                                        placeholder="Escribe la meta a alcanzar en números"
                                        value={data.goal_target}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                goal_target: e.target.value,
                                            })
                                        }}
                                    />
                                    {errors.goal_target && (
                                        <span className="help-block">
                                            {errors.goal_target}
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
                            onClick={handleGoalSubmit}
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <i className="fa fa-spinner fa-spin" />{' '}
                                    Guardando...
                                </>
                            ) : (
                                'Guardar'
                            )}{' '}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

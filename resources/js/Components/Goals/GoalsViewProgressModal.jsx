import useAccordions from '@/Hooks/Accordions'
import { useEffect } from 'react'
import ProgressListItem from '@/Components/Goals/ProgressListItem'

export default function GoalsViewProgressModal({ goal }) {
    return (
        <div
            className="modal fade"
            id="modal-view-goal-progress"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modal-view-goal-progress-label"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            id="modal-view-goal-progress-close"
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4
                            className="modal-title"
                            id="modal-view-goal-progress-label"
                        >
                            Información de la meta
                            <i className="fa fa-flag" />
                        </h4>
                    </div>
                    <div className="modal-body">
                        {goal && (
                            <>
                                <div className="row">
                                    <dt className="col-sm-4">Objetivo:</dt>
                                    <dd className="col-sm-8">
                                        {goal.goal_description}
                                    </dd>
                                    <dt className="col-sm-4 margin-top-10">
                                        Fecha de creación:
                                    </dt>
                                    <dd className="col-sm-8 margin-top-10">
                                        {goal.created_at}
                                    </dd>
                                    <dt className="col-sm-4 margin-top-10">
                                        Última actualización:
                                    </dt>
                                    <dd className="col-sm-8 margin-top-10">
                                        {goal.updated_at}
                                    </dd>
                                    <dt className="col-sm-4 margin-top-10">
                                        Meta:
                                    </dt>
                                    <dd className="col-sm-8 margin-top-10">
                                        <span className="label label-primary">
                                            {goal.goal_target}
                                        </span>
                                    </dd>
                                    <dt className="col-sm-4 margin-top-10">
                                        Completado:
                                    </dt>
                                    <dd className="col-sm-8 margin-top-10">
                                        <span className="label label-success">
                                            {goal.current_goal_progress}
                                        </span>
                                    </dd>
                                    <dt className="col-sm-4 margin-top-10">
                                        Progreso:
                                    </dt>
                                    <dd className="col-sm-8 margin-top-10">
                                        <div className="progress">
                                            <div
                                                className={`progress-bar active progress-bar-${goal.contextual_progress} progress-bar-striped`}
                                                role="progressbar"
                                                aria-valuenow={
                                                    goal.percentage_completed
                                                }
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{
                                                    width: `${goal.percentage_completed}%`,
                                                }}
                                            >
                                                <span>
                                                    {goal.percentage_completed}%
                                                </span>
                                            </div>
                                        </div>
                                    </dd>
                                </div>
                                <div className="row margin-top-20">
                                    <div className="col-xs-12">
                                        <div className="box-content">
                                            <h4 className="box-title">
                                                Progreso registrado
                                            </h4>
                                            {goal.progress.length === 0 && (
                                                <div className="alert alert-info">
                                                    <i className="fa fa-info-circle" />{' '}
                                                    No se ha registrado ningún
                                                    progreso para esta meta.
                                                </div>
                                            )}

                                            {goal.progress.length > 0 && (
                                                <ul className="list-group">
                                                    {goal.progress.map(
                                                        (progress, index) => (
                                                            <ProgressListItem
                                                                key={index}
                                                                progress={
                                                                    progress
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
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

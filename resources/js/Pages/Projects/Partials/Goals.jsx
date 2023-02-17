import Pagination from '@/Components/Pagination'

export default function Goals({ goals = [], auth, onGoalSelected, can }) {
    return (
        <div
            className="tab-pane fade"
            role="tabpanel"
            id="goals"
            aria-labelledby="profile-tab"
        >
            <div className="row">
                <div className="col-xs-12">
                    {goals.total === 0 && (
                        <div className="alert alert-info">
                            <i className="fa fa-info-circle" /> No hay metas
                            registradas para este proyecto
                        </div>
                    )}
                    {goals.total > 0 && (
                        <>
                            <div className="table-responsive">
                                <table className="table table-striped table">
                                    <thead>
                                        <tr>
                                            <th>Descripcion</th>
                                            <th>Fecha de creacion</th>
                                            <th>Última actualizacion</th>
                                            <th>Meta</th>
                                            <th>Completado</th>
                                            <th>Progreso</th>
                                            <th className="text-center">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {goals.data.map((goal) => (
                                            <tr key={goal.id}>
                                                <td>{goal.goal_description}</td>
                                                <td>{goal.created_at}</td>
                                                <td>{goal.updated_at}</td>
                                                <td>
                                                    <span className="label label-success">
                                                        {goal.goal_target}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="label label-primary">
                                                        {
                                                            goal.current_goal_progress
                                                        }
                                                    </span>
                                                </td>
                                                <td>
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
                                                                {
                                                                    goal.percentage_completed
                                                                }
                                                                %
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group">
                                                        <button
                                                            type="button"
                                                            className="btn btn-xs btn-info"
                                                            data-toggle="modal"
                                                            data-target="#modal-view-goal-progress"
                                                            onClick={() =>
                                                                onGoalSelected(
                                                                    goal
                                                                )
                                                            }
                                                        >
                                                            <i className="fa fa-eye" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                prev_page_url={goals.prev_page_url}
                                total={goals.total}
                                last_page={goals.last_page}
                                next_page_url={goals.next_page_url}
                                current_page={goals.current_page}
                                per_page={goals.per_page}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

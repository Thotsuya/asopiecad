import Pagination from '@/Components/Pagination'
import { Link } from '@inertiajs/inertia-react'

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
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Descripcion</th>
                                            <th>Meta</th>
                                            <th className="text-center">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {goals.data.map((goal) => (
                                            <tr key={goal.id}>
                                                <td>{goal.goal_description}</td>
                                                <td>
                                                    <span className="label label-success">
                                                        {goal.goal_target}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group">
                                                        <Link
                                                            href={route(
                                                                'goals.reports.index',
                                                                goal.id
                                                            )}
                                                            className="btn btn-xs btn-info"
                                                        >
                                                            <i className="fa fa-eye" />
                                                        </Link>
                                                        {can[
                                                            'register-goals'
                                                        ] && (
                                                            <button
                                                                title="Editar Meta"
                                                                className="btn btn-xs btn-warning"
                                                                data-toggle="modal"
                                                                data-target="#modal-edit-goal"
                                                                onClick={() =>
                                                                    onGoalSelected(
                                                                        goal
                                                                    )
                                                                }
                                                            >
                                                                <i className="fa fa-edit" />
                                                            </button>
                                                        )}
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

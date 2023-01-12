import { Link } from '@inertiajs/inertia-react'
import useUsers from '@/Hooks/Users'

export default function ProjectCard({ project, roles, auth }) {
    const userProjectRole = project.users.find(
        (user) => user.id === auth.user.id
    ).pivot.role_id

    const userPermissions = roles.find(
        (role) => role.id === userProjectRole
    ).permissions

    const { can } = useUsers()

    return (
        <div
            key={project.id}
            className="col-lg-4 col-md-6 col-xs-12 margin-bottom-30"
        >
            <div
                className="prj-item"
                href={route('projects.edit', project.uuid)}
            >
                <div className="top-project-section">
                    <div className="project-icon">
                        <img src="https://placehold.me/184/170" alt="" />
                    </div>
                    <h3>{project.project_name}</h3>
                    <div className="meta">
                        <p className="author">{project.project_description}</p>
                    </div>
                </div>
                <div className="bottom-project-section">
                    <div className="meta">
                        <div className="points">
                            <i className="fa fa-bar-chart" /> 407
                        </div>
                        <div className="views">
                            <i className="fa fa-book" title="Programas" />{' '}
                            {project.programs_count}
                        </div>
                        <div className="views">
                            <i
                                className="fa fa-users"
                                title="Usuarios / Beneficiarios"
                            />{' '}
                            {project.beneficiaries_count}
                        </div>
                        <div className="views">
                            <i
                                className="fa fa-cogs"
                                title="Miemros del equipo de proyecto"
                            />{' '}
                            {project.users_count}
                        </div>
                        <span className="feedable-time timeago">
                            <b>Última actualización:</b> {project.updated_at}
                        </span>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 margin-top-10">
                            <div className="btn-group pull-right">
                                {can('Editar Proyectos', userPermissions) && (
                                    <Link
                                        href={route(
                                            'projects.edit',
                                            project.uuid
                                        )}
                                        className="btn btn-info btn-sm"
                                    >
                                        <i
                                            className="fa fa-edit"
                                            title="Editar Proyecto"
                                        />
                                    </Link>
                                )}
                                {can('Ver Proyectos', userPermissions) && (
                                    <Link
                                        href={route(
                                            'projects.show',
                                            project.uuid
                                        )}
                                        className="btn btn-primary btn-sm"
                                    >
                                        <i
                                            className="fa fa-eye"
                                            title="Ver Proyecto"
                                        />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

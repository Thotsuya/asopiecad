import { Link } from '@inertiajs/inertia-react'

export default function ProjectCard({ project, roles, auth }) {
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
                        <img src={project.featured_image} alt="" />
                    </div>
                    <h3>{project.project_name}</h3>
                    <div className="meta">
                        <p className="author">{project.project_description}</p>
                    </div>
                </div>
                <div className="bottom-project-section">
                    <div className="meta">
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
                                title="Miembros del equipo de proyecto"
                            />{' '}
                            {project.users_count}
                        </div>
                        <span className="feedable-time timeago">
                            {/*Strip the word 'Hace'*/}
                            <b>Última actualización:</b> {project.updated_at.replace('hace', '')}
                        </span>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 margin-top-10">
                            <div className="btn-group pull-right">
                                {project.can['edit-project'] && (
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

                                {project.can['view-project'] && (
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

                                <Link
                                    className="btn btn-danger btn-sm"
                                    title="Configurar Reportes"
                                    href={route(
                                        'projects.reports.index',
                                        project.uuid
                                    )}
                                >
                                    <i className="fa fa-bar-chart" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

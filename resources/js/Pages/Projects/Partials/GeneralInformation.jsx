import Pagination from '@/Components/Pagination'

export default function GeneralInformation({ project }) {
    return (
        <div
            className="tab-pane fade in active"
            role="tabpanel"
            id="general-info"
            aria-labelledby="general-info-tab"
        >
            <div className="row">
                <div className="col-xs-12 col-lg-4">
                    <dt className="margin-top-10">Nombre</dt>
                    <dd>{project.project_name}</dd>
                    <dt className="margin-top-10">Descripción</dt>
                    <dd>{project.project_description}</dd>
                    <dt className="margin-top-10">Fecha de Inicio</dt>
                    <dd>{project.created_at}</dd>
                    <dt className="margin-top-10">Última Actualización</dt>
                    <dd>{project.updated_at}</dd>
                </div>
                <div className="col-xs-12 col-lg-4">
                    <dt className="margin-top-10">Programas</dt>
                    <dd>{project.programs_count} Programas</dd>
                    <dt className="margin-top-10">Beneficiarios</dt>
                    <dd>{project.beneficiaries_count} Beneficiarios</dd>
                    <dt className="margin-top-10">Usuarios</dt>
                    <dd>{project.users_count} Usuarios</dd>
                    <dt className="margin-top-10">Meta Global</dt>
                    <dd>{project.global_goal} Beneficiarios</dd>
                </div>
                <div className="col-xs-12 col-lg-4">
                    <dt className="margin-top-10">Progreso</dt>
                    <dd>
                        {project.beneficiaries_count} / {project.global_goal}
                    </dd>
                    <dt className="margin-top-10">Porcentaje</dt>
                    <dd>
                        <div
                            className="progress-bar active progress-bar-success progress-bar-striped"
                            role="progressbar"
                            aria-valuenow={project.global_progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{
                                width: `${project.global_progress}%`,
                            }}
                        >
                            <span>{project.global_progress}%</span>
                        </div>
                    </dd>
                </div>
            </div>
        </div>
    )
}

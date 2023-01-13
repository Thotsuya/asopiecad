import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/inertia-react'
import ProjectTitleHeaderAndForm from '@/Pages/Projects/Partials/ProjectTitleHeaderAndForm'
import Programs from '@/Pages/Projects/Partials/ProgramsContent'
import Goals from '@/Pages/Projects/Partials/Goals'
import ProjectBeneficiaries from '@/Pages/Projects/Partials/ProjectBeneficiaries'
import ProjectStatistics from '@/Pages/Projects/Partials/ProjectStatistics'
import ProjectTabs from '@/Pages/Projects/Partials/ProjectTabs'

// Modals
import BeneficiaryCreateModal from '@/Components/Projects/BeneficiaryCreateModal'

export default function Dashboard({ auth, project }) {
    return (
        <>
            <AuthenticatedLayout auth={auth}>
                <Head title={`Proyecto: ${project.project_name}`} />

                <ProjectTitleHeaderAndForm project={project} editable={false}>
                    <div className="btn-group">
                        <button
                            title="Registrar Beneficiario"
                            className="btn btn-xs btn-primary waves-effect waves-light"
                            data-toggle="modal"
                            data-target="#modal-register-beneficiary"
                        >
                            <i className="fa fa-user" />
                        </button>
                        <button
                            title="Registrar nueva meta"
                            className="btn btn-xs btn-info waves-effect waves-light"
                        >
                            <i className="fa fa-flag" />
                        </button>
                        <button
                            title="Registrar nueva visita"
                            className="btn btn-xs btn-success waves-effect waves-light"
                            data-toggle="modal"
                            data-target="#modal-new-visit"
                        >
                            <i className="fa fa-calendar-check-o" />
                        </button>
                    </div>
                </ProjectTitleHeaderAndForm>

                <div className="row">
                    <div className="col-md-9 col-xs-12 margin-bottom-20">
                        <div className="box-content">
                            <h4 className="box-title">
                                Información del Proyecto
                            </h4>
                            <ProjectTabs project={project} />

                            <div className="tab-content" id="myTabContent">
                                <Programs programs={project.programs} />
                                <ProjectBeneficiaries
                                    beneficiaries={project.beneficiaries}
                                />
                                <Goals goals={project.goals} />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-xs-12">
                        <div className="box-content">
                            <h4 className="box-title">
                                Datos Generales del Proyecto
                            </h4>

                            <div className="row">
                                <div className="col-xs-12">
                                    <ul className="list-unstyled">
                                        <li>
                                            <strong>Fecha de Inicio:</strong>{' '}
                                        </li>
                                        <li>
                                            <strong>
                                                Duración del Proyecto:
                                            </strong>{' '}
                                        </li>
                                        <li>
                                            <strong>Estado:</strong>{' '}
                                        </li>
                                        <li>
                                            <strong>Objetivo General:</strong>{' '}
                                        </li>
                                        <li>
                                            <strong>Progreso</strong>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>

            <BeneficiaryCreateModal project={project} />
        </>
    )
}

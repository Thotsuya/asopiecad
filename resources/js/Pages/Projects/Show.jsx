import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/inertia-react'
import ProjectTitleHeaderAndForm from '@/Pages/Projects/Partials/ProjectTitleHeaderAndForm'
import Programs from '@/Pages/Projects/Partials/ProgramsContent'
import Goals from '@/Pages/Projects/Partials/Goals'
import ProjectBeneficiaries from '@/Pages/Projects/Partials/ProjectBeneficiaries'
import ProjectTabs from '@/Pages/Projects/Partials/ProjectTabs'

// Modals
import BeneficiaryCreateModal from '@/Components/Projects/BeneficiaryCreateModal'
import AppointmentCreateModal from '@/Components/Appointments/AppointmentCreateModal'

// Hooks
import { useEffect, useState } from 'react'
import Appointments from '@/Pages/Projects/Partials/Appointments'
import AppointmentsTab from '@/Pages/Projects/Partials/AppointmentsTab'
import AppointmentEditModal from '@/Components/Appointments/AppointmentEditModal'
import AppointmentShowModal from '@/Components/Appointments/AppointmentShowModal'
import GoalsCreateModal from '@/Components/Goals/GoalsCreateModal'
import GoalsProgressModal from '@/Components/Goals/GoalsProgressModal'
import GoalsViewProgressModal from '@/Components/Goals/GoalsViewProgressModal'

export default function Dashboard({
    auth,
    project,
    beneficiaries,
    programs,
    appointments,
    goals,
    paginated_appointments,
    beneficiaries_not_in_project,
}) {
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null)
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [selectedGoal, setSelectedGoal] = useState(null)

    return (
        <>
            <AuthenticatedLayout auth={auth}>
                <Head title={`Proyecto: ${project.project_name}`} />

                <ProjectTitleHeaderAndForm project={project} editable={false}>
                    <div className="btn-group">
                        {project.can['register-beneficiary'] && (
                            <button
                                title="Registrar Beneficiario"
                                className="btn btn-xs btn-primary waves-effect waves-light"
                                data-toggle="modal"
                                data-target="#modal-register-beneficiary"
                            >
                                <i className="fa fa-user" />
                            </button>
                        )}
                        {project.can['register-goals'] && (
                            <button
                                title="Registrar Meta"
                                className="btn btn-xs btn-warning waves-effect waves-light"
                                data-toggle="modal"
                                data-target="#modal-register-goal"
                            >
                                <i className="fa fa-flag" />
                            </button>
                        )}
                    </div>
                </ProjectTitleHeaderAndForm>

                <div className="row">
                    <div className="col-xs-12 margin-bottom-20">
                        <div className="box-content">
                            <h4 className="box-title">
                                Información del Proyecto
                            </h4>
                            <ProjectTabs project={project} />

                            <div className="tab-content" id="myTabContent">
                                <Programs programs={project.programs} />
                                <ProjectBeneficiaries
                                    beneficiaries={beneficiaries}
                                    project={project}
                                    onBeneficiarySelected={
                                        setSelectedBeneficiary
                                    }
                                />
                                <Goals
                                    goals={goals}
                                    auth={auth}
                                    onGoalSelected={setSelectedGoal}
                                    can={project.can}
                                />
                                <AppointmentsTab
                                    appointments={paginated_appointments}
                                    onAppointmentSelected={
                                        setSelectedAppointment
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <Appointments
                        appointments={appointments}
                        setSelectedAppointment={setSelectedAppointment}
                    />
                </div>
            </AuthenticatedLayout>

            <BeneficiaryCreateModal
                project={project}
                beneficiaries={beneficiaries_not_in_project}
            />
            <AppointmentCreateModal
                project={project}
                beneficiary={selectedBeneficiary}
                auth={auth}
            />
            <AppointmentEditModal
                appointment={selectedAppointment}
                auth={auth}
            />
            <AppointmentShowModal appointment={selectedAppointment} />

            <GoalsCreateModal project={project} />
            <GoalsProgressModal goal={selectedGoal} project={project} />
            <GoalsViewProgressModal goal={selectedGoal} />
        </>
    )
}

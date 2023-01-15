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

export default function Dashboard({
    auth,
    project,
    beneficiaries,
    programs,
    appointments,
    paginated_appointments,
}) {
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null)
    const [selectedAppointment, setSelectedAppointment] = useState(null)

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
                                <Goals goals={project.goals} />
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

            <BeneficiaryCreateModal project={project} />
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
        </>
    )
}

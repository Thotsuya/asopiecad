import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/inertia-react'
import ProjectTitleHeaderAndForm from '@/Pages/Projects/Partials/ProjectTitleHeaderAndForm'
import Programs from '@/Pages/Projects/Partials/ProgramsContent'
import Goals from '@/Pages/Projects/Partials/Goals'
import ProjectBeneficiaries from '@/Pages/Projects/Partials/ProjectBeneficiaries'
import ProjectStatistics from '@/Pages/Projects/Partials/ProjectStatistics'

export default function Dashboard({ auth, project }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={`Proyecto: ${project.project_name}`} />

            <ProjectTitleHeaderAndForm project={project} editable={false}>
                <div className="btn-group">
                    <button
                        title="Registrar Beneficiario"
                        className="btn btn-xs btn-primary waves-effect waves-ligt"
                    >
                        <i className="fa fa-user" />
                    </button>
                    <button
                        title="Registrar nueva meta"
                        className="btn btn-xs btn-info waves-effect waves-ligt"
                    >
                        <i className="fa fa-flag" />
                    </button>
                </div>
            </ProjectTitleHeaderAndForm>

            <div className="row">
                <Programs programs={project.programs} />
                <Goals goals={project.goals} />
            </div>

            <div className="row">
                <ProjectBeneficiaries beneficiaries={project.beneficiaries} />
            </div>

            <div className="row">
                <ProjectStatistics project={project} />
            </div>
        </AuthenticatedLayout>
    )
}

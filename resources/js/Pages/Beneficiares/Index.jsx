import { Head, Link } from '@inertiajs/inertia-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import RegisterBeneficiaryModal from '@/Components/Beneficiaries/RegisterBeneficiaryModal'

export default function Index({
    beneficiaries_paginated,
    beneficiaries,
    projects,
    forms,
    auth,
}) {
    return (
        <>
            <AuthenticatedLayout auth={auth}>
                <Head title="Beneficiarios" />

                <div className="prj-header margin-bottom-30">
                    <button
                        type="button"
                        data-toggle="modal"
                        data-target="#modal-register-beneficiary"
                        className="btn btn-info btn-submit-prj btn-sm waves-effect waves-light"
                    >
                        Registrar Beneficiario
                    </button>
                    <div className="result-count">
                        {beneficiaries_paginated.total} Beneficiarios
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <div className="box-content">
                            {beneficiaries_paginated.total === 0 && (
                                <div className="alert alert-info">
                                    No hay beneficiarios registrados
                                </div>
                            )}

                            {beneficiaries_paginated.total > 0 && (
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Código</th>
                                                <th>Proyectos</th>
                                                <th>Estado</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {beneficiaries_paginated.data.map(
                                                (beneficiary, index) => (
                                                    <tr key={beneficiary.id}>
                                                        <td>
                                                            {beneficiary.name}
                                                        </td>
                                                        <td>
                                                            {
                                                                beneficiary.internal_id
                                                            }
                                                        </td>
                                                        <td>
                                                            {/*    Show only 3, then a badge with the rest*/}
                                                            {beneficiary.projects
                                                                .slice(0, 3)
                                                                .map(
                                                                    (
                                                                        project
                                                                    ) => (
                                                                        <Link
                                                                            key={
                                                                                project.id
                                                                            }
                                                                            href={route(
                                                                                'projects.show',
                                                                                project.uuid
                                                                            )}
                                                                            className="badge bg-info"
                                                                        >
                                                                            {
                                                                                project.project_name
                                                                            }
                                                                        </Link>
                                                                    )
                                                                )}
                                                            {beneficiary
                                                                .projects
                                                                .length > 3 && (
                                                                <span className="badge bg-primary">
                                                                    +
                                                                    {beneficiary
                                                                        .projects
                                                                        .length -
                                                                        3}
                                                                </span>
                                                            )}
                                                            {beneficiary
                                                                .projects
                                                                .length ===
                                                                0 && (
                                                                <span className="badge bg-warning">
                                                                    No
                                                                    registrado
                                                                    en proyectos
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <span
                                                                className={`badge bg-${beneficiary.badge}`}
                                                            >
                                                                {
                                                                    beneficiary.internal_status
                                                                }
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <Link
                                                                href={route(
                                                                    'beneficiaries.edit',
                                                                    beneficiary.uuid
                                                                )}
                                                                className="btn btn-primary btn-sm"
                                                            >
                                                                <i className="fa fa-edit"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>

            <RegisterBeneficiaryModal
                beneficiaries={beneficiaries}
                forms={forms}
                projects={projects}
            />
        </>
    )
}
